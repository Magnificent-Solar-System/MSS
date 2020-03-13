camera = new Camera(new vec3(10, 10, -10), new vec3(-10, -10, 10), vec3.unitY());

requestAnimationFrame(mainLoop);

var t = 0;

var time_last = 0;
function mainLoop(time_now) {
    if(enablePostprocessing) Postprocessing.BeginDrawing();
    else gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;

    t += deltaTime;

    earth.position = earth.position.add(earth.velocity.mul(deltaTime));
    earth.velocity = earth.velocity.add( sun.position.sub(earth.position).mul(accel * deltaTime) );
    
    camera.update();
    let vp = new mat4(); 
    mat4.Multiply(vp, camera.viewMatrix,  Postprocessing.projectionMatrix);
    let w = new mat4();
    let m = new mat4();
    
    //draw sun
    mat4.Translation(w, sun.position);
    mat4.Multiply(m, w, vp);

    tchStar.Use(m, SunColor);
    sun.bindArrayBuffer();
    tchStar.SetupAttributes();
    sun.draw();
    tchStar.DisableAttributes();   
    
    //draw earth
    mat4.Translation(w, earth.position);

    tchPlanet.Use(w, vp, sun.position);
    earth.bindArrayBuffer();
    tchPlanet.SetupAttributes();
    earth.draw();
    tchPlanet.DisableAttributes();   
    
    if(enablePostprocessing) Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
