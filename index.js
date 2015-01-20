
var Renderer = require('./lib/renderer')
var fit      = require('canvas-fit')
var raf      = require('raf')

var canvas = document.body.appendChild(document.createElement('canvas'))
var render = Renderer(canvas)

window.addEventListener('resize'
  , fit(canvas)
  , false
)

//test
var COLOR = {
    red: [1.0, 0.0, 0.0]
  , blue: [0.0, 0.0, 1.0]
  , green: [0.0, 1.0, 0.0]
  , black: [1.0, 1.0, 1.0]
}
var state = [
  [COLOR.red, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [COLOR.green, COLOR.green, 0, 0, 0],
  [COLOR.green, COLOR.green, 0, 0, COLOR.blue]
]

raf(function tick() {
  render(state)
  raf(tick)
})
