import { compile, compileAsync } from 'sass-embedded'
import { describe, expect, test } from 'vitest'

const loadPaths = [
  'node_modules',
  'packages/library/src'
]

describe('scissor', () => {

  test.skip('_validate.scss', async () => {

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

  test.skip('_store.scss', async () => {

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

  test.skip('_core.scss', async () => {

    const { css } = await compileAsync(__dirname + '/unit/unit-core.scss', {
      loadPaths
    })

    expect(css).toMatchInlineSnapshot(`
      "/* # Module: variable injection */
      /* ---------------------------- */
      /* Test: should inject variables */
      body {
        --colors-primary: red;
        color: var(--colors-primary);
        color: var(--colors-primary-x0f);
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

  test('library.scss', async () => {

    const { css } = await compileAsync(__dirname + '/unit/unit-library.scss', {
      loadPaths
    })

    expect(css).toMatchInlineSnapshot(`
      "@charset "UTF-8";
      /* # Module: define-store */
      /* ---------------------- */
      /* Test: should define a store */
      /*   ✔ [assert-equal] should define a store */
      /*   ✔ [assert-equal] should define a store */
      /*  */
      /*  */
      /* # Module: define-breakpoint */
      /* --------------------------- */
      /* Test: should define breakpoints */
      /*   ✔ [assert-equal] should define breakpoints */
      /*   ✔ [assert-equal] should define breakpoints */
      /*  */
      /*  */
      /* # Module: define-value */
      /* ---------------------- */
      /* Test: should define a value (1) */
      /*   ✔ [assert-equal] should define a value (1) */
      /*  */
      /*  */
      /* # Module: use-value */
      /* ------------------- */
      /* Test: should get the value */
      :root {
        color: "0e5122";
        color: var(--colors-bar);
      }

      /*  */
      /* Test: should create a separate custom property for an override */
      :root {
        color: var(--colors-primary-046f11);
        color: var(--colors-primary-046f11);
      }

      /*   ✔ [assert-equal] should create a separate custom property for an override */
      /*  */
      /* Test: should create not create unneccessary duplicate custom properties */
      :root {
        color: var(--colors-primary);
        color: var(--colors-primary);
      }

      /*   ✔ [assert-equal] should create not create unneccessary duplicate custom properties */
      /*  */
      /*  */
      /* # Module: use-store */
      /* ------------------- */
      /* Test: should inject a single custom property */
      :root {
        --colors-primary: red;
      }

      /*  */
      /* Test: should inject all custom properties */
      :root {
        --colors-primary: red;
        --sizes-small: 10px;
      }

      /*  */
      /*  */
      /* # Module: use-breakpoint */
      /* ------------------------ */
      /* Test: should create block for a breakpoint (*/to) */
      @media (max-width: 375px) {
        :root {
          color: red;
        }
      }

      /*  */
      /* Test: should create block for a breakpoint (from/*) */
      @media (min-width: 375px) {
        :root {
          color: red;
        }
      }

      /*  */
      /* Test: should create block for a breakpoint (from/to) */
      @media (min-width: 375px) and (max-width: 768px) {
        :root {
          color: red;
        }
      }

      /*  */
      /* Test: should create block for breakpoint with modifiers */
      @media (max-width: 374px) {
        :root {
          color: red;
        }
      }
      @media (min-width: 769px) {
        :root {
          color: red;
        }
      }
      @media (max-width: 768px) {
        :root {
          color: red;
        }
      }
      @media (min-width: 375px) {
        :root {
          color: red;
        }
      }

      /*  */
      /*  */"
    `)

  })

})