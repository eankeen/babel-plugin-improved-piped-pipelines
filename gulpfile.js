import { src, dest } from 'gulp'

export default async function copyReadme() {
  await src('readme.md')
    .pipe(dest('babel-plugin-improved-piped-pipelines'))
    .pipe(dest('babel-plugin-syntax-improved-piped-pipelines-operator'))
}

