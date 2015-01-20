var Geometry = require('gl-geometry')
var mat4     = require('gl-mat4')
var normals  = require('normals')
var glslify  = require('glslify')
var cube     = require('a-cube')

module.exports = main

function main(canvas) {
  if(this instanceof main) {
    return main(canvas)
  }

  if(!canvas) {
    throw new Error('renderer expects a canvas.')
  }

  var gl = context(canvas)
  var camera = require('canvas-orbit-camera')(canvas)
  var geometry = Geometry(gl)

  geometry.attr('aPosition', cube.positions)
  geometry.attr('aNormal', cube.normals)
  geometry.faces(cube.cells)

  var projection = mat4.create()
  var model      = mat4.create()
  var view       = mat4.create()
  var height
  var width

  var state = []

  var shader = glslify({
      vert: '../shaders/main.vert'
    , frag: '../shaders/main.frag'
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

  function render(state) {
    if(!Array.isArray(state)) {
      throw new Error('expected Array')
    }

    update()

    gl.viewport(0, 0, width, height)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

    geometry.bind(shader)

    // Update model/view/projection matrices.
    shader.uniforms.uProjection = projection
    shader.uniforms.uView = view
    shader.uniforms.uCamera = camera.rotation

    state = state.slice().reverse()

    for(var i = 0; i < state.length; ++i) {
      var row = state[i]
      for(var j = 0; j < row.length; ++j) {
        if(!row[j]) continue

        shader.uniforms.uModel = mat4.translate(
            mat4.create()
          , model
          , [j * 2, i * 2, 0.0]
        )
        shader.uniforms.uColor = row[j]
        geometry.draw(gl.TRIANGLES)
      }
    }
  }

  return render
}

function context(canvas) {
  var gl = (
    canvas.getContext('webgl') ||
    canvas.getContext('webgl-experimental') ||
    canvas.getContext('experimental-webgl')
  )

  if(!gl) {
    throw new Error('Unable to initialize WebGL')
  }

  return gl
}