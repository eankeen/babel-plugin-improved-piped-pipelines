# babel-plugin-improved-piped-pipelines

Piggybacks on the new [pipeline operator syntax](https://github.com/tc39/proposal-pipeline-operator) to improve developer experience when using a gulp-like piping API. Mainly reduces the repetitive `.pipe` call and the messy closing parenthesis `))`

Right now, it depends on the conflicting pipeline JavaScript feature, so I hope to repurpose the `|>` syntax to something else.

## Example

### Input

```js
gulp.src('style.css')
  |> plumber()
  |> postcss()
  |> rename('style.min.css')
  |> gulp.dest('dist')
```

### Output

```js
gulp.src('style.css')
  .pipe(plumber())
  .pipe(postcss())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('dist'))
```

## Usage

`operator` options can be any of the following: `['|>', '||', '&&', '??']`. the default is the pipeline operator

```json
{
  "plugins": [
    ["babel-plugin-improved-piped-pipelines", { "operator": "|>" }]
  ]
}
```

## Contributing

```sh
git clone https://github.com/hyperupcall/babel-improved-piped-pipelines
cd babel-plugin-improved-piped-pipelines
pnpm i -r
pnpm publish
```
