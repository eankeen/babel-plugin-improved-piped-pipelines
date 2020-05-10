import test from 'ava'
import { transformAsync } from '@babel/core'
import plugin from '../'

const proposalVariants = ['|>', '&&', '||', '??'].map(op => {
  return { operator: op, text: `let bravo

gulp.src('src')
  ${op} middle('')
  ${op} gulp.dest('dist')`
}})

for (const proposalVariant of proposalVariants) {
  test(`testing snapshot for operator ${proposalVariant.operator}`, async t => {
    try {
      const { code } = await transformAsync(proposalVariant.text, {
        plugins: [
          [
            plugin,
            {
              operator: proposalVariant.operator
            }
          ]
        ],
        ast: true
      })

      t.snapshot(code)
      t.pass()
    } catch (err) {
      console.error(err)
      t.fail()
    }
  })
}
