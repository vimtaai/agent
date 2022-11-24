---
title: Field Class
permalink: /api/field
parent: API Reference
nav_order: 3
layout: reference
---

# Field Class

## Properties

### field.**x**: number (read-only)
The X coordinate of the Field

### field.**y**: number (read-only)
The Y coordinate of the Field

### field.**color**: string
The color of the Field, *must be a valid [CSS color][color]*

### field.**neighbors**: array (read-only)
The array of the up to 8 neighboring Fields

### field.**neighborsInRadius**(radius: number): array (read-only)
The array Fields within the given radius, *`radius` must be positive*

[color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
