import { compile, compileAsync } from 'sass-embedded'
import { describe, expect, test } from 'vitest'

const loadPaths = [
  'node_modules',
  'packages/library/src'
]

describe('scissor/core', () => {

  test('_validate.scss', async () => {

    const { css } = await compileAsync(__dirname + '/unit/unit-validate.scss', {
      loadPaths
    })

    expect(css).toMatchInlineSnapshot(`
      "/* # Module: type validation */
      /* ------------------------- */
      /* Test: should validate scalar values */
      /*  */
      /* Test: should validate map values */
      /*  */
      /* Test: should validate union types */
      /*  */
      /*  */"
    `)

  })

  test('_store.scss', async () => {

    const { css } = await compileAsync(__dirname + '/unit/unit-store.scss', {
      loadPaths
    })

    expect(css).toMatchInlineSnapshot(`
      "@charset "UTF-8";
      /* # Module: namespaces */
      /* -------------------- */
      /* Test: should create a namespace */
      /*   ✔ [assert-equal] should create a namespace */
      /*  */
      /* Test: should add values to a namespace */
      /*   ✔ [assert-equal] should add values to a namespace */
      /*  */
      /*  */
      /* # Module: breakpoints */
      /* --------------------- */
      /* Test: should add breakpoints using only "to" */
      /*   ✔ [assert-equal] should add breakpoints using only "to" */
      /*  */
      /* Test: should add breakpoints using only "from" */
      /*   ✔ [assert-equal] should add breakpoints using only "from" */
      /*  */
      /* Test: should add breakpoints using both "from" and "to" */
      /*   ✔ [assert-equal] should add breakpoints using both "from" and "to" */
      /*  */
      /* Test: should get a breakpoint */
      /*   ✔ [assert-equal] should get a breakpoint */
      /*  */
      /*  */
      /* # Module: values */
      /* ---------------- */
      /* Test: should get a scalar value */
      /*   ✔ [assert-equal] should get a scalar value */
      /*  */
      /* Test: should get a scalar value by breakpoint (1) */
      /*   ✔ [assert-equal] should get a scalar value by breakpoint (1) */
      /*  */
      /* Test: should get a scalar value by breakpoint (2) */
      /*   ✔ [assert-equal] should get a scalar value by breakpoint (2) */
      /*  */
      /*  */"
    `)

  })

  test('_core.scss', async () => {

    const { css } = await compileAsync(__dirname + '/unit/unit-core.scss', {
      loadPaths
    })

    expect(css).toMatchInlineSnapshot(`
      "/* # Module: variable injection */
      /* ---------------------------- */
      /* Test: should inject variables */
      body {
        --colors-primary: red;
      }
      @media (max-width: 1440px) {
        body {
          --colors-primary: blue;
        }
      }

      /*  */
      /*  */"
    `)

  })

})