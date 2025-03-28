[![npm](https://img.shields.io/npm/dt/hypercrush.svg)](#)

HyperCrush
========================

Crushes HTML or SVG code.  Code can be raw markup, or it can be Javascript that happens to contain quotes markup within.
It should be used in conjunction with your html-minifier and your JS minifier/terser.  This module doesn't do everything, it just squeezes a bit more out.

Input:
```
<div id="myId" class="big blue" data-toggle="true">
  <em>Some "text" here</em>
</div>
```

Output:
```
<div id=myId class="big blue"data-toggle=true><em>Some "text" here</em></div>
```

> Gotcha: Now you can't rely on *whitespace between tags* for styling.


## Installation

This is a Node.JS module available from the Node Package Manager (NPM).

https://www.npmjs.com/package/hypercrush

Here's the command to download and install from NPM:

`npm install hypercrush -S`

or with Yarn:

`yarn add hypercrush`

## Usage

### Command Line

To run **HyperCrush** from the command line:

```bash
node hypercrush input.js output.js
```

This will process the `input.js` file, deduplicate its strings, and save the output to `output.js`.


### Gulp Integration

In your `gulpfile.mjs`, use **HyperCrush** as a Gulp plugin:

#### Step 1: Import **HyperCrush**

```javascript
import hypercrush from 'hypercrush';
```

#### Step 2: Add HyperCrush to your minification tasks

For Javascript, add it BEFORE your terser/minifier:
```javascript

    .pipe(hypercrush.gulp())
    .pipe(terser({ ecma: 7, mangle: { toplevel: true } }))

```

For HTML, add it AFTER your minifier:

For Javascript, add it BEFORE your terser/minifier:
```javascript

    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(hypercrush.gulp())

```

---

## Note

For more Javascript minification check out [JCrush](https://www.npmjs.com/package/jcrush).

---

## Contributing

https://github.com/braksator/hypercrush

In lieu of a formal style guide, take care to maintain the existing coding
style.
