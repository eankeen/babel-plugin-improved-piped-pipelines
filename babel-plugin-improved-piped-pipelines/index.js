import improvedPipedPipelinesOperator from 'babel-plugin-syntax-improved-piped-pipelines-operator'

export default function ({ types: t }) {
  return {
    name: 'babel-plugin-improved-piped-pipelines',
    inherits: improvedPipedPipelinesOperator,
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
