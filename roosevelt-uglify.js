const UglifyJS = require('uglify-es').minify
const fs = require('fs')
const path = require('path')

module.exports = {
  parse: function (app, fileName) {
    const code = fs.readFileSync(path.join(app.get('jsPath'), fileName), 'utf-8')
    let options = app.get('params').js.compiler.params || {}
    const logger = app.get('logger')

    // make a copy of the params so the originals aren't modified
    options = JSON.parse(JSON.stringify(options))

    // port showWarnings param over to uglify params
    if (app.get('params').js.compiler.showWarnings) {
      options.warnings = true
    }

    const result = UglifyJS(code, options)
    const newJs = result.code
    const errors = result.error

    // only populated when warnings option passed
    const warnings = result.warnings

    if (warnings) {
      logger.warn('⚠️  UglifyJS Warnings:')
      logger.warn(warnings)
    }

    if (errors) {
      throw errors
    }

    return newJs
  }
}
