camera = new Camera(new vec3(0, 0, -1), vec3.unitZ(), vec3.unitY());

requestAnimationFrame(mainLoop);

var time_last = 0;
function mainLoop(time_now) {
    Postprocessing.BeginDrawing();
    
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;

    camera.update();
    let vp = new mat4(); 
    mat4.Multiply(vp, camera.viewMatrix,  Postprocessing.projectionMatrix);
    let w = new mat4();
    
    //draw sun
    mat4.Translation(w, sun.position);
    let m = new mat4();
    mat4.Multiply(m, w, vp);

    tchStar.Use(m, SunColor);
    sun.bindArrayBuffer();
    tchStar.SetupAttributes();
    sun.draw();
    tchStar.DisableAttributes();   
    
    //draw earth
    mat4.Translation(w, earth.position);
    mat4.Multiply(m, w, vp);

    tchPlanet.Use(m, sun.position.add(new vec3(3, 3, -1)));
    earth.bindArrayBuffer();
    tchPlanet.SetupAttributes();
    earth.draw();
    tchPlanet.DisableAttributes();   
    
    Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
