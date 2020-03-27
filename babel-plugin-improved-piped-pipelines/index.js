import syntaxPipelineOperator from '@babel/plugin-syntax-pipeline-operator'

export default function ({ types: t }) {
  return {
    name: 'babel-plugin-improved-piped-pipelines',
    inherits: syntaxPipelineOperator,
    visitor: {
      BinaryExpression(path) {
        const { node } = path

        if (!path.isBinaryExpression({ operator: '|>' })) return

        path.replaceWith(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(node.left, t.identifier('pipe')),
              [node.right]
            )
          )
        )
      }
    }
  }
}
