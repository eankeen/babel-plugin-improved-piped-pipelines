// mostly taken from babel-plugin-syntax-pipeline-operator
import { declare } from '@babel/helper-plugin-utils'

export default declare((api, { operator }) => {
  api.assertVersion(7)

  if (!operator) {
    operator = '|>'
  }

  const supportedOperators = new Set(['|>', '||', '&&', '??'])

  let supportedOperatorsString = '';
  supportedOperators.forEach((supportedOp, index) =>
    supportedOperatorsString += supportedOp + ' ' )

  if (!supportedOperators.has(operator)) {
    throw new Error(`the operator '${operator}' is not supported for the plugin` +
      `babel-plugin-syntax-improved-pipelines. we support the following` +
      `operators: ${supportedOperatorsString}`)
  }

  return {
    name: 'syntax-improved-piped-pipelines-operator',

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(['pipelineOperator', { proposal: 'minimal' }])
    }
  }
})


