import path from 'path'
import fs from 'fs'
import test from 'ava'
import { transformAsync } from '@babel/core'
import plugin from '../index.js'

const normalTests = new Set([
  new Map([
    ['operator', '??'],
    ['filePath', 'nullish']
  ]),
  new Map([
    ['operator', '|>'],
    ['filePath', 'pipeline']
  ])
])

normalTests.forEach(async (tt) => {
  test(`normal test for operator ${tt.get('operator')}`, async t => {
    const input = await fs.promises.readFile(
      path.join(__dirname, `fixtures/${tt.get('filePath')}/in.js`),
      { encoding: 'utf8' }
    )
    const output = await fs.promises.readFile(
      path.join(__dirname, `fixtures/${tt.get('filePath')}/out.js`),
      { encoding: 'utf8' }
    )
    try {
      const { code } = await transformAsync(input, {
        plugins: [
          [
            plugin,
            {
              operator: tt.get('operator')
            }
          ]
        ],
        ast: true
      })

      t.is(output, code)
    } catch (err) {
      console.error(err)
      t.fail()
    }
  })
})
