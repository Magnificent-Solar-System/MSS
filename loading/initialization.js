canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
canvasW = canvas.width;
canvasH = canvas.height;

gl = canvas.getContext("webgl2-compute");  
gl.frontFace(gl.CW);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.GEQUAL);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.clearDepth(0);
gl.clearColor(0, 0, 0, 1);
gl.getExtension("EXT_color_buffer_float");

Technique.Initialize();
