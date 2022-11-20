---
title: Model
permalink: /api/model
parent: API Reference
nav_order: 1
layout: reference
---

# Model Class

## Constructor

### **new Model**(width = 50, height = 50, scale = 1)
Creates a new model and inserts it into the document

## Properties

### model.**width**: number
The width of the model in [Fields][field]

### model.**height**: number
The height of the model in [Fields][field]

### model.**scale**: number
The zoom level of the model, the size of a [Fields][field] in pixels

### model.**fields**: array (read-only)
The array of [Fields][field] of the model in row-major order

### model.**agents**: array (read-only)
The array of [Agents][agent] of the model in the order they were added

### model.**centerX**: number (read-only)
The X coordinate of the center of the model

### model.**centerY**: number (read-only)
The Y coordinate of the center of the model

### model.**center**: object (read-only)
The coordinates of the center of the model in { x, y } format

### model.**randomX**: number (read-only)
A random X coordinate of the model

### model.**randomY**: number (read-only)
A random Y coordinate of the model

### model.**randomFieldX**: number (read-only)
The X coordinate of a random [Field][field] of the model

### model.**randomFieldY**: number (read-only)
The Y coordinate of a random [Field][field] of the model

### model.**randomField**: [Field][field] (read-only)
A random [Field][field] of the model

### model.**randomAgent**: [Agent][agent] (read-only)
A random [Agent][agent] of the model

## Methods

### model.**update()**
Forces the model to re-render

### model.**addAgent**(agent)
Adds an [Agent][agent] to the model

### model.**removeAgent**(agent)
Removes an [Agent][agent] from the model

### model.**clearDrawing()**
Clears all drawings from the canvas

### model.**clearAgents()**
Removes all [Agents][agent] from the model

[field]: /api/field
[agent]: /api/agent
