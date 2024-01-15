import type { PluginCreator, AtRule, Result, Rule, Plugin, Declaration } from 'postcss'
import { parse } from 'vue/compiler-sfc'

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

  const palettes: Record<string, Palette> = {}
  const breakpoints: Record<string, Breakpoint> = {}

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

    breakpoints[name] = { name, rules }

    atRule.remove()

  }

  function definePalette (args: string[], atRule: AtRule) {

    const name = args[0]

    // create palette if it doesn't exist

    if (!palettes[name]) {
      palettes[name] = {}
    }

    atRule.nodes?.forEach(node => {

      const valueName = node.prop || node.selector

      // if ends with colon it's a group definition

      if (valueName?.endsWith(':')) {

        const trimmedName = valueName.slice(0, -1)

        palettes[name][trimmedName] = {}

        node.nodes?.forEach(node => {
          palettes[name][trimmedName][node.prop || '*'] = node.value
        })

      } else {

        palettes[name][valueName] = {
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

    if (!palettes[paletteName]) {
      palettes[paletteName] = {}
    }

    // create value if it doesn't exist

    if (!palettes[paletteName][valueName]) {
      palettes[paletteName][valueName] = {}
    }

    // loop over breakpoints and store values

    atRule.nodes.forEach(node => {

      const decl = node as Declaration
      const breakpointName = decl.prop || '*'
      const breakpointValue = decl.value

      palettes[paletteName][valueName][breakpointName] = breakpointValue

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
  
  function useRule (atRule: AtRule) {
    
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
        palettes,
        breakpoints
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