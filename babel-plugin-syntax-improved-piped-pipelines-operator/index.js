// mostly taken from babel-plugin-syntax-pipeline-operator
import { declare } from '@babel/helper-plugin-utils'

export default declare(syntax)

/**
 * @param {Record<string, any>} api
 * @param {Record<string, any>} options
 */
function syntax(api, options) {
	api.assertVersion(7)

	return {
		name: 'syntax-improved-piped-pipelines-operator',

		/**
		 * @param {Record<string, any>} opts
		 * @param {Record<string, any>} parserOpts
		 */
		manipulateOptions(opts, parserOpts) {
			// if (options.operator !== '|>') return

			// TODO: upgrade proposal to F# or smart
			parserOpts.plugins.push(['pipelineOperator', { proposal: 'minimal' }])
		},
	}
}
