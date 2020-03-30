var g, canvas, projectionMatrix;
function initialize() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvasW = canvas.width;
    canvasH = canvas.height;

    gl = canvas.getContext("webgl2-compute", { antialias: false });  
    gl.getExtension("EXT_color_buffer_float");
    gl.clearColor(0, 0, 0, 1);

    gl.frontFace(gl.CW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearDepth(1);

    projectionMatrix = new mat4();

    Technique.Initialize();
    Skysphere.Initialize();
    Postprocessing.Initialize();

    loadData();
}