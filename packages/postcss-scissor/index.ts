import type { PluginCreator } from 'postcss'

export type pluginOptions = {}

// Design:
// Create two plugins;
// One for initial processing and enqueueing overrides
// Another for final processing and applying overrides to root

const creator: PluginCreator<{}> = () => {

  return {
    postcssPlugin: 'postcss-scissor',
    Rule(rule) {
      console.log(rule.source?.input.file)
      rule.selector = '.kek'
    },
    OnceExit(css) {
      console.log(css.source?.input.file)
    },
    Document(document) {
      console.log('done?')
    }
  }

}

creator.postcss = true;

export default creator