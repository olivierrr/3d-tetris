
var Renderer = require('./lib/renderer')
var Game     = require('./lib/game')
var fit      = require('canvas-fit')
var raf      = require('raf')

var canvas = document.body.appendChild(document.createElement('canvas'))

var render = Renderer(canvas)
var game = Game()

window.addEventListener('resize'
  , fit(canvas)
  , false
)

window.setInterval(function() {
  game.tick()
}, 1000)

raf(function tick() {
  render(game.board())
  raf(tick)
})