const UglifyJS = require('uglify-js').minify
const fs = require('fs')
const path = require('path')

module.exports = {
  parse: function (app, fileName) {
    let code = fs.readFileSync(path.join(app.get('jsPath'), fileName), 'utf-8')
    let options = app.get('params').js.compiler.params || {}
    let result
    let newJs
    let errors
    let warnings

    // port showWarnings param over to uglify params
    if (app.get('params').js.compiler.showWarnings) {
      options.warnings = true
    }

    result = UglifyJS(code, options)
    newJs = result.code
    errors = result.error

    // only populated when warnings option passed
    warnings = result.warnings

    if (warnings) {
      console.warn('⚠️  UglifyJS Warnings:'.bold.yellow)
      console.warn(warnings)
    }

    if (errors) {
      throw errors
    }

    return newJs
  }
}
