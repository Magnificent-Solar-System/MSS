camera = new Camera(new vec3(0,50, -50), 0, 0, 0);

requestAnimationFrame(mainLoop); //todo: run after loading complete : or main executed after loading only? async textures loading...

var t = 0;

var time_last = 0;
var first_run = true;

function mainLoop(time_now) {
    if(enablePostprocessing) Postprocessing.BeginDrawing();
    else {
        const aspectRatio = canvas.width / canvas.height;
        mat4.Perspective(projectionMatrix, aspectRatio, zNearPlane, zFarPlane, fov);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    
    if(first_run) { time_last = time_now; first_run = false; }
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;
    t += deltaTime;
    
    camera.update();
    let viewProjectionMatrix = new mat4();
    mat4.Multiply(viewProjectionMatrix, camera.viewMatrix, projectionMatrix);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, planetGeometry.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planetGeometry.indexBuffer);
    
    for(let i = 0; i < PLANETS.length; ++i)
        drawPlanet(PLANETS[i], viewProjectionMatrix);
    
    Skybox.Draw(camera.viewMatrix, projectionMatrix);
    
    if(enablePostprocessing) Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
