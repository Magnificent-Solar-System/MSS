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
    tchStar.Use(matrix, SunColor);
    sun.bindArrayBuffer();
    tchStar.SetupAttributes();
    sun.draw();
    tchStar.DisableAttributes();   
    
    //draw earth
    tchPlanet.Use(matrix, sun.position.add(new vec3(3, 3, -1)));
    earth.bindArrayBuffer();
    tchPlanet.SetupAttributes();
    earth.draw();
    tchPlanet.DisableAttributes();   
    
    Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}