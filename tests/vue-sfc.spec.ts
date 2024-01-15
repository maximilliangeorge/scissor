import type { LogLevel } from 'vite'
import { build } from 'vite'
import { describe, expect, test } from 'vitest'
import vue from '@vitejs/plugin-vue'
import scissorPlugin from '../packages/postcss-scissor/index'

const buildOpts = {
  root: './tests/fixtures/vue-sfc',
  logLevel: 'silent' as LogLevel,
  build: {
    cssCodeSplit: true,
    minify: false,
  },
  plugins: [
    vue()
  ],
  css: {
    postcss: {
      plugins: [
        scissorPlugin()
      ]
    }
  }
}

describe('postcss test', () => {

  test('should parse css', async () => {

    const result = await build(buildOpts)

    // @ts-ignore
    
    const compiledCss = result.output.filter(entry => {
      return entry.name?.includes('.css')
    })

    // console.log(compiledCss[0].source)

    // console.log(compiledCss[1].source)

  })

})