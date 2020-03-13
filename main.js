camera = new Camera(new vec3(100, 120, -100), new vec3(-100, -120, 100), vec3.unitY());

requestAnimationFrame(mainLoop);

var t = 0;

var time_last = 0;
var first_run = true;
function mainLoop(time_now) {
    if(enablePostprocessing) Postprocessing.BeginDrawing();
    else gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(first_run) { time_last = time_now; first_run = false; }
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;

    t += deltaTime;
    
    camera.update();
    let vp = new mat4(); 
    let w = new mat4();
    let m = new mat4();
    mat4.Multiply(vp, camera.viewMatrix,  Postprocessing.projectionMatrix);

    
    //draw sun
    mat4.Translation(w, sun.position);
    mat4.Multiply(m, w, vp);

    tchStar.Use(m, SunColor);
    sun.bindArrayBuffer();
    tchStar.SetupAttributes();
    sun.draw();
    tchStar.DisableAttributes();   
    
    //planets-update
    let F = [vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero()];
    for(let i = 0; i < 7; i++) {
        for(let j = i + 1; j < 8; j++) {
            let dF = planets[i].position.sub(planets[j].position);
            let mF = planets[i].mass * planets[j].mass * G / (dF.sqrlen);
            dF = vec3.norm(dF);
            F[i] = F[i].add(dF.mul(-mF));
            F[j] = F[j].add(dF.mul(mF));
        }
    }
    for(let i = 0; i < 8; i++) {
        let sqrR = planets[i].position.sqrlen;
        let dir = planets[i].position.inv().norm();
        F[i] = F[i].add( dir.mul(G * planets[i].mass * SunMass / sqrR) );
        
        planets[i].velocity = planets[i].velocity.add(F[i].div(planets[i].mass).mul(deltaTime));
        planets[i].position = planets[i].position.add(planets[i].velocity.mul(deltaTime));
    }
    //planets-draw
    for(let i = 0; i < 8; i++) {
        mat4.Translation(w, planets[i].position);
        tchPlanet.Use(w, vp, sun.position);
        planets[i].bindArrayBuffer();
        tchPlanet.SetupAttributes();
        planets[i].draw();
        tchPlanet.DisableAttributes();  
    }    
    
    if(enablePostprocessing) Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
