const improvedPipedPipelinesOperator = require('babel-plugin-syntax-improved-piped-pipelines-operator')

/**
 * @param {string} operator
 */
function checkOperator(operator) {
	const supportedOperators = new Set(['|>', '||', '&&', '??'])
	let supportedOperatorsString = ''
	supportedOperators.forEach(
		(supportedOp) => (supportedOperatorsString += supportedOp + ' '),
	)

	if (!supportedOperators.has(operator)) {
		throw new Error(
			`the operator '${operator}' is not supported for the plugin` +
				`babel-plugin-syntax-improved-pipelines. we support the following` +
				`operators: ${supportedOperatorsString}`,
		)
	}
}

/**
 * @param {Record<string, any>} api
 * @param {Record<string, any>} options
 */
module.exports = function (api, options) {
	api.assertVersion(7)

	if (options && options.proposal) {
		throw new Error(`'proposal' has been removed. please use the 'operator' option \
      instead. if you use no option, the default is '|>'`)
	}

	const { types: t } = api
	const { operator = '|>' } = options

	checkOperator(operator)

	return {
		name: 'babel-plugin-improved-piped-pipelines',
		inherits: improvedPipedPipelinesOperator,
		visitor: {
			/**
			 *
			 * @param {any} path
			 */
			BinaryExpression(path) {
				const { node } = path

				if (!path.isBinaryExpression({ operator })) return

				path.replaceWith(
					t.expressionStatement(
						t.callExpression(
							t.memberExpression(node.left, t.identifier('pipe')),
							[node.right],
						),
					),
				)
			},
			/**
			 *
			 * @param {any} path
			 */
			LogicalExpression(path) {
				const { node } = path

				// if (!path.isBinaryExpression({ operator })) return
				if (!t.isLogicalExpression(node, { operator })) return

				path.replaceWith(
					t.expressionStatement(
						t.callExpression(
							t.memberExpression(node.left, t.identifier('pipe')),
							[node.right],
						),
					),
				)
			},
		},
	}
}
