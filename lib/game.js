
var TETROMINOS = [
    [0x0F00, 0x2222, 0x00F0, 0x4444]
  , [0x44C0, 0x8E00, 0x6440, 0x0E20]
  , [0x4460, 0x0E80, 0xC440, 0x2E00]
  , [0xCC00, 0xCC00, 0xCC00, 0xCC00]
  , [0x06C0, 0x8C40, 0x6C00, 0x4620]
  , [0x0E40, 0x4C40, 0x4E00, 0x4640]
  , [0x0C60, 0x4C80, 0xC600, 0x2640]
]

function game(width, height) {
  if(this instanceof game) {
    return game(width, height)
  }

  width = width || 10
  height = height || 22 

  var board = cleanBoard(width, height)
  var tetrominos = []

  return {
    tick: function(input) {
      //
    },
    board: function() {
      return board
    }
  }
}

function cleanBoard(width, height) {
  var arr = []
  for(var i = 0; i < height; ++i) {
    arr.push([])
    for(var j = 0; j < width; ++j) {
      arr[i].push([0.1, 0.6, 0.6])
    }
  }
  return arr
}

// function clamp(num, min, max) {
//   return Math.min(Math.max(num, min), max)
// }

// function occupied(type, x, y, dir) {
//   var result = false
//   eachblock(type, x, y, dir, function(x, y) {
//     if ((x < 0) || (x >= nx) || (y < 0) || (y >= ny) || getBlock(x,y)) {
//       result = true
//     }
//   })
//   return result
// }

// function getBlock(x,y) { 
//   return blocks && blocks[x] && blocks[x][y]
// }

// function eachblock(type, x, y, dir, fn) {
//   var bit, result, row = 0, col = 0, blocks = type.blocks[dir]
//   for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
//     if (blocks & bit) {
//       fn(x + col, y + row)
//     }
//     if (++col === 4) {
//       col = 0
//       ++row
//     }
//   }
// }

module.exports = game