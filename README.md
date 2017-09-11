roosevelt-uglify
===

[UglifyJS](https://github.com/mishoo/UglifyJS2) support for [Roosevelt MVC web framework](https://github.com/rooseveltframework/roosevelt).

# Usage

Declare the `roosevelt-uglify` module as a dependency in the package.json of your roosevelt app.

Then declare your JS compiler by passing it as a param to Roosevelt:

```js
"rooseveltConfig": {
  "jsCompiler": {nodeModule: "roosevelt-uglify", params: {someParam: someValue}}
}
```

See the [UglifyJS API docs](https://github.com/mishoo/UglifyJS2#api-reference) for documentation on available params.
