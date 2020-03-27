# babel-plugin-improved-piped-pipelines

Piggybacks on the new [pipeline operator syntax](https://github.com/tc39/proposal-pipeline-operator) to improve developer experience when using a gulp-like piping API. Mainly reduces the repetitive `.pipe` call and the messy closing parenthesis `))`

Right now, it depends on the conflicting pipeline JavaScript feature, so I hope to repurpose the `|>` syntax to something else.

*Note*: This is a very `0.1.0` quality plugin. Use at your own risk

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

Note that only the `minimal` proposal has been tested

```json
{
  "plugins": [
    ["babel-plugin-improved-piped-pipelines", { "proposal": "minimal"}]
  ]
}
```
