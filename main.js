camera = new Camera(new vec3(0, 0, -1), vec3.unitZ(), vec3.unitY());

requestAnimationFrame(mainLoop);

var t = 0;

var time_last = 0;
function mainLoop(time_now) {
    if(enablePostprocessing) Postprocessing.BeginDrawing();
    else gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;

    t += deltaTime;

    camera.update();
    let vp = new mat4(); 
    mat4.Multiply(vp, camera.viewMatrix,  Postprocessing.projectionMatrix);
    let w = new mat4();
    
    //draw sun
    let s = new mat4();
    let r = new mat4();
    mat4.Translation(s, sun.position);
    let sc = Math.cos(t)+1;
    mat4.Scale(r, new vec3(sc,sc,sc));
    mat4.Multiply(w, r, s);
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
    
    if(enablePostprocessing) Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
