import { src, dest } from 'gulp'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'

async function minifyCss() {
  src('style.css')
    |> plumber()
    |> sourcemaps.init()
    |> postcss()
    |> rename('style.min.css')
    |> sourcemaps.write('.')
    |> dest('.')
}

export { minifyCss, minifyCss as default }
