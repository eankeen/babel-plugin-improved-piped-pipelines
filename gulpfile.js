const { src, dest } = require('gulp')

const plugin = 'babel-plugin-improved-piped-pipelines'
const syntax = 'babel-plugin-syntax-improved-piped-pipelines-operator'

exports.copyFiles = async function copyFiles() {
  src('README.md').pipe(dest(plugin)).pipe(dest(syntax))

  src('LICENSE').pipe(dest(plugin)).pipe(dest(syntax))
}
