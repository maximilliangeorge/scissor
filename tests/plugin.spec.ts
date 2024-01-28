import fs from 'fs'
import postcss from 'postcss'
import scissorPlugin from '../packages/postcss-scissor/index'
import { describe, expect, test } from 'vitest'

const cssString = fs.readFileSync('./tests/fixtures/style.css', 'utf-8')

describe('postcss test', () => {

  test('should parse css', async () => {

    const result = await postcss([
      scissorPlugin()
    ]).process(cssString, {
      from: undefined,
      to: undefined,
    })

    expect(result.scissor.breakpoints).toMatchInlineSnapshot(`
      {
        "mobile": {
          "name": "mobile",
          "rules": [
            {
              "prop": "min-width",
              "value": "320px",
            },
            {
              "prop": "max-width",
              "value": "767px",
            },
          ],
        },
      }
    `)

    expect(result.scissor.palettes).toMatchInlineSnapshot(`
      {
        "__global": {
          "red": {
            "*": "red",
          },
        },
        "colors": {
          "primary": {
            "*": "#000",
          },
          "secondary": {
            "*": "#fff",
          },
        },
        "sizes": {
          "large": {
            "*": "20px",
          },
          "primary": {
            "*": "10px",
            "desktop": "20px",
            "mobile": "15px",
            "xl": "scale-up(50%)",
          },
          "secondary": {
            "*": "10px",
            "tablet": "15px",
          },
        },
        "typo": {
          "h1": {
            "*": "#ff0000",
            "desktop": "#ff0000",
          },
        },
      }
    `)

    expect(result.css).toMatchInlineSnapshot(`
      "/* breakpoint declarations */

      /* palette declarations */

      /* value declarations */

      /* pattern declarations */

      @define pattern('typo/headline') {

        * {
          margin-top: 10px;
          margin-bottom: 10px;
        }

        mobile {
          margin-top: 5px;
          margin-bottom: 5px;
        }

      }

      /* usage */

      body {
              --x-colors-primary: #000;
              --x-colors-secondary: #fff;
              --x-sizes-large: 20px;
              --x-sizes-primary: 10px;
              --x-sizes-secondary: 10px;
              @media (min-width: 320px) and (max-width: 767px) {
                
                  --x-sizes-primary: 15px;
                
              }
        @use pattern('typo/headline');

        margin-top: value('spacing/10');

        /* color: value('color/primary', (
          desktop: blue
        )); */

        margin-top: value('spacing/10',
          not('mobile', 10px)
        );

        margin-top: value('spacing/10', {
          mobile: 10px;
          tablet: 15px;
        });

        /* static value */

        margin-top: value('spacing/10', 'mobile');

        @use breakpoint('mobile', '==') {
          color: green;
        }

      }"
    `)

  })

})