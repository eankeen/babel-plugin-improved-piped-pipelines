import path from 'path'
import fs from 'fs'
import test from 'ava'
import { transformAsync } from '@babel/core'
import plugin from '../index.js'

test('generic fixture test', async t => {
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
            operator: '|>'
          }
        ]
      ],
      ast: true
    })
    // fs.promises.writeFile('temp', code)
    t.is(output, code)
  } catch (err) {
    console.error(err)
  }
})

test('generic fixture test 2', async t => {
  const input = await fs.promises.readFile(
    path.join(__dirname, 'fixtures/nullish/in.js'),
    { encoding: 'utf8' }
  )
  const output = await fs.promises.readFile(
    path.join(__dirname, 'fixtures/nullish/out.js'),
    { encoding: 'utf8' }
  )
  try {
    const { code } = await transformAsync(input, {
      plugins: [
        [
          plugin,
          {
            operator: '??'
          }
        ]
      ],
      ast: true
    })
    // fs.promises.writeFile('temp', code)
    t.is(output, code)
  } catch (err) {
    console.error(err)
  }
})

test('throws on invalid operator option', async t => {
  try {
    await transformAsync(`let a = 3;`, {
      plugins: [[plugin, { operator: '*%' }]],
      ast: true
    })
    t.fail()
  } catch (err) {
    t.pass()
  }
})
