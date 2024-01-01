
import fs from 'fs'
import postcss from 'postcss'
import scissorPlugin from '../src/index'
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

    // expect(result.css).toMatchInlineSnapshot()

  })

})