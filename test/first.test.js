import path from 'path'
import fs from 'fs'
import test from 'ava'
import { transformAsync } from '@babel/core'
import plugin from '../index.js'

test('testing for match', async t => {
  const input = await fs.promises.readFile(
    path.join(__dirname, 'fixtures/one.in.js'),
    { encoding: 'utf8' }
  )
  const output = await fs.promises.readFile(
    path.join(__dirname, 'fixtures/one.out.js'),
    { encoding: 'utf8' }
  )
  try {
    const { code } = await transformAsync(input, {
      plugins: [
        [
          plugin,
          {
            proposal: 'minimal'
          }
        ]
      ],
      ast: true
    })
    fs.promises.writeFile('temp', code)
    t.is(output, code)
  } catch (err) {
    console.error(err)
  }
})
