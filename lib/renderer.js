var Geometry = require('gl-geometry')
var mat4 = require('gl-mat4')
var normals = require('normals')
var glslify = require('glslify')
var cube = require('a-cube')
var mousePosition = require('mouse-position')
var mousePressed = require('mouse-pressed')

module.exports = main

function main(canvas) {
  if(this instanceof main) {
    return main(canvas)
  }

  if(!canvas) {
    throw new Error('renderer expects a canvas.')
  }

  var state

  var mouse = {
      position: mousePosition(canvas)
    , pressed: mousePressed(canvas)
  }

  var gl = context(canvas)

  var geometry = Geometry(gl)
  geometry.attr('aPosition', cube.positions)
  geometry.attr('aNormal', cube.normals)
  geometry.faces(cube.cells)

  var camera = require('orbit-camera')(
      [11, 30, 30] // is the eye vector of the camera
    , [11, 30, 0]  // is the target the camera is looking at
    , [0, 1, 0]    // is the up direction for the camera
  )

  camera.position = [11, 30, 30]

  var projection = mat4.create()
  var model = mat4.create()
  var view = mat4.create()

  var shader = glslify({
      vert: '../shaders/main.vert'
    , frag: '../shaders/main.frag'
  })(gl)

  function update() {

    // Update camera.
    var x = (mouse.position.x / canvas.width * 2) - 1
    var y = (mouse.position.y / canvas.height * 2) - 1
    var dirX = y / 100
    camera.position[1] += dirX
    camera.pan([0, dirX, 0])
    camera.view(view)

    // Update projection matrix.
    var aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
    var fieldOfView = Math.PI / 4
    var near = 0.01
    var far  = 200

    mat4.perspective(
        projection
      , fieldOfView
      , aspectRatio
      , near
      , far
    )

    // Cleanup.
    mouse.position.flush()
  }

  function render(state) {
    if(!Array.isArray(state)) {
      throw new Error('expected Array')
    }

    update()

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

    geometry.bind(shader)

    // Update model/view/projection matrices.
    shader.uniforms.uProjection = projection
    shader.uniforms.uView = view

    state = state.slice().reverse()

    for(var i = 0; i < state.length; ++i) {
      var row = state[i]
      for(var j = 0; j < row.length; ++j) {
        if(!row[j]) continue

        shader.uniforms.uModel = mat4.translate(
            mat4.create()
          , model
          , [j * 2.5, i * 2.5, 0.0]
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