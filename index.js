var Geometry = require('gl-geometry')
var fit      = require('canvas-fit')
var mat4     = require('gl-mat4')
var normals  = require('normals')
var glslify  = require('glslify')
var cube     = require('a-cube')

var canvas = document.body.appendChild(document.createElement('canvas'))
var camera = require('canvas-orbit-camera')(canvas)
var gl = require('gl-context')(canvas, render)

window.addEventListener('resize'
  , fit(canvas)
  , false
)

var geometry = Geometry(gl)

geometry.attr('aPosition', cube.positions)
geometry.faces(cube.cells)

var projection = mat4.create()
var model      = mat4.create()
var view       = mat4.create()
var height
var width

var shader = glslify({
    vert: './shaders/main.vert'
  , frag: './shaders/main.frag'
})(gl)

function update() {

  width  = gl.drawingBufferWidth
  height = gl.drawingBufferHeight

  camera.view(view)
  camera.tick()

  // Update projection matrix.
  var aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
  var fieldOfView = Math.PI / 4
  var near = 0.01
  var far  = 100

  mat4.perspective(
      projection
    , fieldOfView
    , aspectRatio
    , near
    , far
  )
}

function render() {
  update()

  gl.viewport(0, 0, width, height)
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)

  geometry.bind(shader)

  // Update model/view/projection matrices.
  shader.uniforms.uProjection = projection
  shader.uniforms.uView = view
  shader.uniforms.uModel = model

  geometry.draw(gl.TRIANGLES)
}
