var tch = new tchPlanet(); //create technique

camera = new Camera(new vec3(0, 0, -1), vec3.unitZ(), vec3.unitY());

const aspectRatio = targetTextureWidth / targetTextureHeight;
let projectionMatrix = new mat4();
mat4.Perspective(projectionMatrix, aspectRatio, 0.001, 50, 1);

requestAnimationFrame(mainLoop);

var time_last = 0;
function mainLoop(time_now) {
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;
    
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    //update camera view matrix
    camera.update();
    //resulting matrix
    let matrix = new mat4(); 
    matrix.copy(camera.viewMatrix);
    matrix.mul(projectionMatrix);
    
    //draw sphere
    tch.Use(matrix, new vec3(- 3, 3, -1));
    earth.bindArrayBuffer();
    tch.SetupAttributes();
    earth.draw();
    tch.DisableAttributes();    
    
    requestAnimationFrame(mainLoop);
}