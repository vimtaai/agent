---
title: Agent
permalink: /api/agent
parent: API Reference
nav_order: 2
layout: reference
---

# Agent Class

## Constructor

### **new Agent**({ x = 0, y = 0 })
Creates a new Agent in memory and sets the default coordinates

## Properties

### agent.**x**: number
The X coordinate of the Agent

### agent.**fieldX**: number
The X coordinate of the [Field][field] that the Agent is on

### agent.**y**: number
The Y coordinate of the Agent

### agent.**fieldY**: number (read-only)
The Y coordinate of the [Field][field] that the Agent is on

### agent.**heading**: number
The heading the Agent is facing in degrees

### agent.**size**: number
The size (scaling factor) of the Agent, *must be positive*

### agent.**color**: string
The fill color of the Agent, *must be a valid [CSS color][color]*

### agent.**penColor**: string
The color of the line the Agent uses to draw its path, *must be a valid [CSS color][color]*

### agent.**penWidth**: string
The width of the line the Agent uses to draw its path, *must be positive*

### agent.**isPenDown**: boolean (read-only)
Returns whether the Agent will draw its path when it moves

### agent.**label**: String
The label that gets displayed above the Agent

### agent.**shape**: Shape
Reference to the [Shape][shape] class that defines the shape of the Agent

### agent.**model**: [Model][model] (read-only)
Reference to the [Model][model] that contains the Agent, `null` otherwise

## Methods

### agent.**forward**(amount: number)
Moves the Agent forward with the given amount in the direction it is facing

### agent.**back**(amount: number)
Moves the Agent back with the given amount in the opposite direction it is facing

### agent.**left**(amount: number)
Turns the facing of the Agent left (counter-clockwise) with the given amount of degrees

### agent.**right**(amount: number)
Turns the facing of the Agent right (clockwise) with the given amount of degrees

### agent.**face**(target: Agent | [Field][field])
Turns the facing of the Agent right (clockwise) with the given amount of degrees

### agent.**putPenDown**()
Puts the pen down, the Agent will draw its path when it moves

### agent.**pickPenUp**()
Picks the pen up, the Agent will no longer draw its path when it moves

[model]: {{ site.baseurl }}/api/model
[field]: {{ site.baseurl }}/api/field
[shape]: {{ site.baseurl }}/api/shape
[color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
