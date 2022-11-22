---
title: Canvas Class
permalink: /api/canvas
parent: API Reference
nav_order: 4
layout: reference
---

# Canvas Class

```js
import { Canvas } from "https://vimtaai.github.io/agent/lib/index.js";
```

## Constructor

### **new Canvas**(properties: object)
Creates a new Canvas, sets its initial properties from the given object, and inserts it into the document
#### Example
```js
const canvas = new Canvas({ width: 500, height: 500 });
```

## Properties

### canvas.**width**: number
The width of the Canvas in pixels, if set to `undefined` the Canvas will size automatically  
**Default:** `undefined`

### canvas.**height**: number
The height of the Canvas in pixels, if set to `undefined` the Canvas will size automatically  
**Default:** `undefined`

### canvas.**style**: [CSSStyleDeclaration][style-declaration]
The [CSS style property][style-property] of the Canvas

[style-property]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
[style-declaration]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
