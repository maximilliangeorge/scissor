import { compile, compileAsync } from 'sass-embedded'
import { describe, expect, test } from 'vitest'

const loadPaths = [
  'node_modules',
  'src'
]

describe('scissor', () => {

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

  test('x syntax', async () => {

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
      /* Test: should allow value definitions with the store */
      /*   ✔ [assert-equal] should allow value definitions with the store */
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
      /* Test: should inject multiple custom properties */
      :root {
        --colors-primary: red;
        --sizes-small: 10px;
      }

      /*  */
      /* Test: should inject multiple custom properties with breakpoints */
      :root {
        --colors-primary: red;
        --sizes-small: 10px;
      }
      @media (max-width: 375px) {
        :root {
          --colors-primary: blue;
          --sizes-small: 20px;
        }
      }
      @media (min-width: 376px) and (max-width: 768px) {
        :root {
          --sizes-small: 30px;
        }
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

  test('use/define syntax', async () => {

    const { css } = await compileAsync(__dirname + '/unit/unit-use-define.scss', {
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
      /* Test: should allow value definitions with the store */
      /*   ✔ [assert-equal] should allow value definitions with the store */
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
      /* Test: should inject multiple custom properties */
      :root {
        --colors-primary: red;
        --sizes-small: 10px;
      }

      /*  */
      /* Test: should inject multiple custom properties with breakpoints */
      :root {
        --colors-primary: red;
        --sizes-small: 10px;
      }
      @media (max-width: 375px) {
        :root {
          --colors-primary: blue;
          --sizes-small: 20px;
        }
      }
      @media (min-width: 376px) and (max-width: 768px) {
        :root {
          --sizes-small: 30px;
        }
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