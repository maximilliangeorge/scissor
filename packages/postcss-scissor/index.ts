import type { PluginCreator, AtRule, Result, Rule, Plugin, Declaration } from 'postcss'
import { parse } from 'postcss'

export type pluginOptions = {}

// Design:
// Create two plugins;
// One for initial processing and enqueueing overrides
// Another for final processing and applying overrides to root

const plugin: PluginCreator<{}> = (opts) => {

  type Value = {
    name: string
    defaultValue?: string
    breakpointValues?: Record<string, string>
  }

  type Palette = Record<string, Record<string, string>>

  type Breakpoint = {
    name: string
    rules: Record<string, string>
  }

  const Palettes: Record<string, Palette> = {}
  const Breakpoints: Record<string, Breakpoint> = {}

  function parseAtRule (rule: AtRule): [string, string[]] {

    const regex = /(\w+)\((.*)\)/
    const match = rule.params.match(regex)
    const keyword = match?.[1] as string
    const argStr = match?.[2] || ''

    const args: string[] = argStr
      .replace(/'/g, '')
      .split(',')
      .map(arg => arg.trim())

    return [keyword, args]

  }

  function defineBreakpoint (args: string[], atRule: AtRule) {

    const name = args[0]

    const rules = atRule.nodes
      .filter(node => node.type === 'decl')
      .map(node => {

        const decl = node as Declaration

        return {
          prop: decl.prop,
          value: decl.value
        }

      })

    Breakpoints[name] = { name, rules }

    atRule.remove()

  }

  function definePalette (args: string[], atRule: AtRule) {

    const name = args[0]

    // create palette if it doesn't exist

    if (!Palettes[name]) {
      Palettes[name] = {}
    }

    atRule.nodes?.forEach(node => {

      const valueName = node.prop || node.selector

      if (node.nodes?.length) {

        const trimmedName = valueName?.endsWith(':') ?
          valueName.slice(0, -1) : valueName

          Palettes[name][trimmedName] = {}

        node.nodes?.forEach(node => {
          Palettes[name][trimmedName][node.prop || '*'] = node.value
        })

      } else {

        Palettes[name][valueName] = {
          '*': node.value
        }

      }

    })

    atRule.remove()

  }

  function defineValue (args: string[], atRule: AtRule) {

    const name = args[0]
    const fragment_1 = name.split('/')[0]
    const fragment_2 = name.split('/')[1]

    const paletteName = fragment_2 ? fragment_1 : '__global'
    const valueName = fragment_2 ? fragment_2 : fragment_1

    // create palette if it doesn't exist

    if (!Palettes[paletteName]) {
      Palettes[paletteName] = {}
    }

    // create value if it doesn't exist

    if (!Palettes[paletteName][valueName]) {
      Palettes[paletteName][valueName] = {}
    }

    // loop over breakpoints and store values

    atRule.nodes.forEach(node => {

      const decl = node as Declaration
      const breakpointName = decl.prop || '*'
      const breakpointValue = decl.value

      Palettes[paletteName][valueName][breakpointName] = breakpointValue

    })

    atRule.remove()

  }

  function defineRule (rule: AtRule) {

    const [keyword, args] = parseAtRule(rule)

    switch (keyword) {
      case 'breakpoint':
        defineBreakpoint(args, rule)
        break;
      case 'value':
        defineValue(args, rule)
        break;
      case 'palette':
        definePalette(args, rule)
        break;
    }

  }
  
  function useBreakpoint (args: string[], atRule: AtRule) {}

  function useValue (args: string[], atRule: AtRule) {}

  function usePalette (args: string[], atRule: AtRule) {

    const paletteName = args[0]
    const palette = Palettes[paletteName]

    if (!palette) {
      throw new Error(`Palette "${paletteName}" not found`)
    }

    // first loop over default values

    const rules = <any>[]

    Object.entries(palette).forEach(([valueName, value]) => {

      const rule = parse(`
        --x-${paletteName}-${valueName}: ${value['*']};
      `)

      rules.push(rule)

    })

    // then loop over breakpoints

    Object.entries(Breakpoints).forEach(([breakpointName, breakpoint]) => {

      const breakpointRules = <any>[]

      Object.entries(palette).forEach(([valueName, value]) => {

        if (value[breakpointName]) {

          const rule = parse(`
            --x-${paletteName}-${valueName}: ${value[breakpointName]};
          `)

          breakpointRules.push(rule)

        }

      })

      if (breakpointRules.length === 0) return

      const mediaQuery = breakpoint.rules.reduce((acc, rule, index, arr) => {

        acc = acc + `(${rule.prop}: ${rule.value})`

        if (index < arr.length - 1) {
          acc = acc + ' and '
        }

        return acc

      }, '@media ')

      const mediaRule = parse(`
        ${mediaQuery} {
          ${breakpointRules}
        }
      `)
      
      rules.push(mediaRule)

    })

    // add rules to stylesheet

    atRule.replaceWith(...rules)

  }

  function useRule (atRule: AtRule) {
    
    const [keyword, args] = parseAtRule(atRule)

    switch (keyword) {
      case 'breakpoint':
        useBreakpoint(args, atRule)
        break;
      case 'value':
        useValue(args, atRule)
        break;
      case 'palette':
        usePalette(args, atRule)
        break;
    }

  }

  return {
    postcssPlugin: 'postcss-scissor',
    Rule(rule) {
    },
    AtRule(atRule) {

      switch (atRule.name) {
        case 'define':
          defineRule(atRule)
          break;
        case 'use':
          useRule(atRule)
          break; 
      }

    },
    Once (_, { result }) {
      result.scissor = {
        palettes: Palettes,
        breakpoints: Breakpoints
      }
    },
    OnceExit(css) {
      // console.log(css.source?.input.file)
    },
    Document(document) {
      // console.log('done?')
    }
  }

}

plugin.postcss = true

export default plugin