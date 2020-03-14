camera = new Camera(new vec3(0,50, -50), 0, 0, 0);

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

    //testing quats on sun
    let quat = Quaternion.FromAxisAngle(new vec3(0, 0, 1), t);
    let rotMat = new mat4();
    quat.toMatrix(rotMat);
    //mat4.Translation(w, sun.position);
    mat4.Multiply(m, rotMat, vp);
    tchStar.Use(m, SunColor );
    sun.bindArrayBuffer();
    tchStar.SetupAttributes(sun.tex);
    sun.draw();
    tchStar.DisableAttributes(); 

    //draw earth
    mat4.Translation(w, earth.position);
    tchEarth.Use(w,vp,sun.position, earth.tex[0] , earth.tex[1]);
    earth.bindArrayBuffer();
    tchEarth.SetupAttributes();
    earth.draw();
    tchEarth.DisableAttributes();
    
    //planets-update
    /*let F = [vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero(), vec3.zero()];
    for(let i = 0; i < 6; i++) {
        for(let j = i + 1; j < 7; j++) {
            let dF = vec3.sub(planets[i].position, planets[j].position);
            let mF = planets[i].mass * planets[j].mass * G / (dF.sqrlen);
            dF = vec3.norm(dF);
            F[i] = vec3.add(F[i], vec3.mulvs(dF, -mF));
            F[j] = vec3.add(F[j], vec3.mulvs(dF, mF));
        }
    }
    for(let i = 0; i < 7; i++) {
        let sqrR = planets[i].position.sqrlen;
        let dir = vec3.norm(vec3.inv(planets[i].position));
        F[i] = vec3.add(F[i], vec3.mulvs(dir, G * planets[i].mass * SunMass / sqrR) );
        
        planets[i].velocity = vec3.add( planets[i].velocity, vec3.mulvs(vec3.divvs(F[i], planets[i].mass), deltaTime));
        planets[i].position = vec3.add( planets[i].position, vec3.mulvs(planets[i].velocity, deltaTime));
    }*/
    //planets-draw
    tchPlanet.Use(vp, sun.position);
    for(let i = 0; i < 7; i++) {
        mat4.Translation(w, planets[i].position);
        tchPlanet.SetWorldMatrix(w);
        planets[i].bindArrayBuffer();
        tchPlanet.SetupAttributes(planets[i].tex);
        planets[i].draw();
        tchPlanet.DisableAttributes();  
    }    
    
    if(enablePostprocessing) Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
