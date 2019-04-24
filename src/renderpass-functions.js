// to add: ripple: https://www.shadertoy.com/view/4djGzz
// mask
// convolution
// basic sdf shapes
// repeat
// iq color palletes
var glsl = require('glslify')

module.exports = {
<<<<<<< HEAD
  sharpen: {
    type: 'renderpass',
    inputs: [
      {
        type: 'float',
        name: 'amountX',
        default: 1.0
      },
      {
        type: 'float',
        name: 'amountY',
        default: 1.0
      },
      {
        type: 'float',
        name: 'mixWithOriginal',
        default: 0.5
=======
  _convolution: {
    type: 'renderpass_util',
    glsl: `
      float kernel [9];

      vec4 _convolution (vec2 uv, float[9] _kernel, float kernelWeight) {
        vec2 st = uv/resolution.xy;
        vec2 onePixel = vec2(4.0, 4.0) / resolution.xy;
        //  vec2 onePixel = vec2(1.0, 1.0);
        vec4 colorSum =
          texture2D(prevBuffer, st + onePixel * vec2(-1, -1)) * _kernel[0] +
          texture2D(prevBuffer, st + onePixel * vec2( 0, -1)) * _kernel[1] +
          texture2D(prevBuffer, st + onePixel * vec2( 1, -1)) * _kernel[2] +
          texture2D(prevBuffer, st + onePixel * vec2(-1,  0)) * _kernel[3] +
          texture2D(prevBuffer, st + onePixel * vec2( 0,  0)) * _kernel[4] +
          texture2D(prevBuffer, st + onePixel * vec2( 1,  0)) * _kernel[5] +
          texture2D(prevBuffer, st + onePixel * vec2(-1,  1)) * _kernel[6] +
          texture2D(prevBuffer, st + onePixel * vec2( 0,  1)) * _kernel[7] +
          texture2D(prevBuffer, st + onePixel * vec2( 1,  1)) * _kernel[8] ;
        colorSum /= kernelWeight;
        return colorSum;
>>>>>>> master
      }
    ],
    frag: glsl('./shaders/sharpen.frag')
  },
  edges: {
    type: 'renderpass',
    inputs: [
      {
        type: 'float',
        name: 'uWeakThreshold',
        default: 0.4
      },{
        type: 'float',
        name: 'uStrongThreshold',
        default: 0.6
      }
    ],
    frag: glsl('./shaders/edges.frag')
  },
  blur: {
    type: 'renderpass',
<<<<<<< HEAD
    inputs: [
      {
        type: 'float',
        name: 'directionX',
        default: 1.0
      },{
        type: 'float',
        name: 'directionY',
        default: 0.0
=======
    glsl: `
      void main () {
    //    kernel[0] = -0.125; kernel[1] = -0.125; kernel[2] = -0.125;
      //  kernel[3] = -0.125; kernel[4] = 1.0; kernel[5] = -0.125;
      //  kernel[6] = -0.125; kernel[7] = -0.125; kernel[8] = -0.125;

// blur
     kernel[0] = 0.0; kernel[1] = 1.0; kernel[2] = 0.0;
     kernel[3] = 1.0; kernel[4] = 1.0; kernel[5] = 1.0;
     kernel[6] = 0.0; kernel[7] = 1.0; kernel[8] = 0.0;

      kernel[0] = 5.0; kernel[1] = -0.0; kernel[2] = -0.0;
      kernel[3] = 0.0; kernel[4] = 0.0; kernel[5] = 0.0;
      kernel[6] = -0.0; kernel[7] = -0.0; kernel[8] = -5.0;

        vec4 sum = _convolution( gl_FragCoord.xy, kernel, 10.0);
        gl_FragColor = clamp(sum , vec4(0.0), vec4(1.0));
    //   vec2 st = gl_FragCoord.xy/resolution.xy;
    //    vec4 col = texture2D(prevBuffer, fract(st));
    //  gl_FragColor = vec4(st, 1.0, 1.0);
>>>>>>> master
      }
    ],
    frag: glsl('./shaders/gaussian.frag')
  },
  halftone: {
    type: 'renderpass',
    inputs: [
      {
        type: 'float',
        name: 'frequency',
        default: 30.0
      }
    ],
    frag: glsl('./shaders/halftone.frag')
  },
  dither: {
    type: 'renderpass',
    inputs: [],
    frag: glsl('./shaders/dither.frag')
  }
}
