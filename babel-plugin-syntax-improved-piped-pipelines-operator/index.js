// mostly taken from babel-plugin-syntax-pipeline-operator
import { declare } from '@babel/helper-plugin-utils'

export default declare((api, options) => {
  api.assertVersion(7)

  return {
    name: 'syntax-improved-piped-pipelines-operator',

    manipulateOptions(opts, parserOpts) {
      // if (options.operator !== '|>') return

      parserOpts.plugins.push(['pipelineOperator', { proposal: 'minimal' }])
    }
  }
})


