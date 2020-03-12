camera = new Camera(new vec3(0, 0, -1), vec3.unitZ(), vec3.unitY());

requestAnimationFrame(mainLoop);

var time_last = 0;
function mainLoop(time_now) {
    Postprocessing.BeginDrawing();
    
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;

    camera.update();
    let matrix = new mat4(); 
    matrix.copy(camera.viewMatrix);
    matrix.mul(Postprocessing.projectionMatrix);
    
    //draw sun
    mat4.Translation(sun.worldMatrix, sun.position);
    let mm = new mat4();
    mm.copy(sun.worldMatrix);
    mm.mul(matrix);
    tchStar.Use(mm, SunColor);
    sun.bindArrayBuffer();
    tchStar.SetupAttributes();
    sun.draw();
    tchStar.DisableAttributes();   
    
    //draw earth
    mat4.Translation(earth.worldMatrix, earth.position);
    earth.worldMatrix.mul(matrix);
    tchPlanet.Use(earth.worldMatrix, sun.position);
    earth.bindArrayBuffer();
    tchPlanet.SetupAttributes();
    earth.draw();
    tchPlanet.DisableAttributes();   
    
    Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}