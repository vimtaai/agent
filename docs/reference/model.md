---
title: Model
permalink: /api/model
parent: API Reference
nav_order: 1
layout: reference
---

# Model Class

## Constructor

### **new Model**(properties: object)
Creates a new Model, sets its initial properties from the given object, and inserts it into the document

## Properties

### model.**width**: number
The width of the Model in [Fields][field]

### model.**height**: number
The height of the Model in [Fields][field]

### model.**scale**: number
The zoom level of the Model, the size of a [Fields][field] in pixels

### model.**fields**: array (read-only)
The array of [Fields][field] of the Model in row-major order

### model.**agents**: array (read-only)
The array of [Agents][agent] of the Model in the order they were added

### model.**centerX**: number (read-only)
The X coordinate of the center of the Model

### model.**centerY**: number (read-only)
The Y coordinate of the center of the Model

### model.**center**: object (read-only)
The coordinates of the center of the Model in { x, y } format

### model.**randomX**: number (read-only)
A random X coordinate of the Model

### model.**randomY**: number (read-only)
A random Y coordinate of the Model

### model.**randomFieldX**: number (read-only)
The X coordinate of a random [Field][field] of the Model

### model.**randomFieldY**: number (read-only)
The Y coordinate of a random [Field][field] of the Model

### model.**randomField**: [Field][field] (read-only)
A random [Field][field] of the Model

### model.**randomAgent**: [Agent][agent] (read-only)
A random [Agent][agent] of the Model

## Methods

### model.**update()**
Forces the Model to re-render

### model.**addAgent**(agent: [Agent][agent])
Adds an [Agent][agent] to the Model

### model.**removeAgent**(agent: [Agent][agent])
Removes an [Agent][agent] from the Model

### model.**clearDrawing()**
Clears all drawings from the Model

### model.**clearAgents()**
Removes all [Agents][agent] from the Model

[field]: {{ site.baseurl }}/api/field
[agent]: {{ site.baseurl }}/api/agent
