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

async function read(inputFilePath = 'fixtures/pipeline/in.js', outputFilePath = 'fixtures/pipeline/out.js') {
  const input = await fs.promises.readFile(
    path.join(__dirname, inputFilePath),
    { encoding: 'utf8' }
  )
  const output = await fs.promises.readFile(
    path.join(__dirname, outputFilePath),
    { encoding: 'utf8' }
  )

  return { input, output }
}

// these tests fail but the snapshot succeeds
normalTests.forEach(async (tt) => {
  test(`normal test for operator ${tt.get('operator')}`, async t => {
    const { input, output } = await read(`fixtures/${tt.get('filePath')}/in.js`, `fixtures/${tt.get('filePath')}/out.js`)

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

      t.is(code, output)
    } catch (err) {
      console.error(err)
      t.fail()
    }
  })
})


test(`ensure default parameter works`, async t => {
  const { input, output } = await read()

  const { code } = await transformAsync(input, {
    plugins: [
      plugin
    ],
    ast: true
  })

  console.log('vv', output)
  t.is(output, code)
})

test('throws on incorrect object option value', async t => {
  const { input } = await read()

  await t.throwsAsync(async () => {
    await transformAsync(input, {
      plugins: [[plugin, { operator: 'thing' }]],
      ast: true
    })
  })
})


test('throws on incorrect object option key', async t => {
  const { input } = await read()

  await t.throwsAsync(async () => {
     await transformAsync(input, {
      plugins: [[plugin, { proposal: 'value' }]],
      ast: true
    })
  })
})
