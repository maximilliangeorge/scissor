import { compile } from 'sass-embedded'
import { describe, expect, it } from 'vitest'

const loadPaths = [
  'node_modules',
  'packages/library/src'
]

describe('base', () => {

  it.skip('should work with plain scss files', async () => {

    const { css } = compile(__dirname + '/fixtures/use-core.scss', { loadPaths })

    expect(css).toMatchInlineSnapshot(`
      ".foo {
        color: pink;
      }"
    `)

  })

  it('should work with sass-true', async () => {

    const { css } = compile(__dirname + '/unit/store.scss', {
      loadPaths
    })

    expect(css).toMatchInlineSnapshot(`
      "@charset "UTF-8";
      /* # Module: namespaces */
      /* -------------------- */
      /* Test: should create the namespace */
      /*   ✔ [assert-equal] should create the namespace */
      /*  */
      /* Test: should add values to the namespace */
      /*   ✔ [assert-equal] should add values to the namespace */
      /*  */
      /*  */"
    `)

  })

})