# think-template-handlebars

handlebars template adapter for ThinkJS

## Install

```sh
npm install think-template-handlebars
```

## How to use

### register adapter

```js
import HandlebarseAdapter from 'think-template-handlebars';
think.adapter('template', 'handlebars', HandlebarseAdapter);
```

add above code in bootstrap file, like `src/common/boostrap/adapter.js`.

### change view type

change view type in file `src/common/config/view.js`,

```js
export default {
  type: 'handlebars',
  adapter: {
    handlebars: { //handlebars options

    }
  }
}
```

##handlebars layouts usage
```handlebars
{{#extend "home/master/index.hbs"}}


{{/extend}}
```

```handlebars
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>hello</title>
</head>
<body>
{{hello}}
</body>
</html>
```
more info for [handlebars layouts](https://github.com/jumplee/think-handlebars-layouts)

### precompiled

you can precompile handlebars template before deployed. it will auto identified when render template.
