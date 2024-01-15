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
            "*": "#fff",
            "mobile": "#00f",
          },
        },
        "sizes": {
          "large": {
            "*": "20px",
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
        @use store('typo');
        @use pattern('typo/headline');
        margin-top: value('spacing/10');

        color: value('color/primary', (
          *: red,
          desktop: blue
        ));

        margin-top: value('spacing/10',
          exception('mobile', 10px),
          exception('tablet', 15px)
        );

        @use breakpoint('mobile', '==') {
          color: green;
        }

      }"
    `)

  })

})