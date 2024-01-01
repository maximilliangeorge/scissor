import type { PluginCreator } from 'postcss'

export type pluginOptions = {}

const creator: PluginCreator<{}> = () => {

  return {
    postcssPlugin: 'postcss-scissor',
    Rule(rule) {
      console.log(rule.source?.input.file)
      rule.selector = '.kek'
    }
  }

}

creator.postcss = true;

export default creator