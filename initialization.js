var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
canvasW = canvas.width;
canvasH = canvas.height;

var gl = canvas.getContext("webgl2-compute", { antialias: false });  
gl.getExtension("EXT_color_buffer_float");
gl.clearColor(0, 0, 0, 1);

gl.frontFace(gl.CW);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);

gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.clearDepth(1);

var projectionMatrix = new mat4();
var enablePostprocessing = true;

Technique.Initialize();

loadData();

Skysphere.Initialize();
Postprocessing.Initialize();