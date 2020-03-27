// mostly taken from babel-plugin-syntax-pipeline-operator
import { declare } from '@babel/helper-plugin-utils'

export const proposals = ['pipeline', 'arrow', 'minimal']

export default declare((api, { proposal }) => {
  api.assertVersion(7)

  if (typeof proposal !== 'string' || !proposals.includes(proposal)) {
    throw new Error(
      "The improved-piped-piplines operator plugin requires a 'proposal' option." +
        "'proposal' must be one of: " +
        proposals.join(', ') +
        '. More details: https://github.com/eankeen/babel-improved-piped-pipelines'
    )
  }

  if (proposal === 'pipeline' || proposal === 'arrow') {
    throw new Error(`'pipeline' or 'arrow' options not supported yet`)
  }

  return {
    name: 'syntax-improved-piped-pipelines-operator',

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(['pipelineOperator', { proposal }])
    }
  }
})

