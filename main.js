requestAnimationFrame(mainLoop);

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
    
    let viewProjectionMatrix = new mat4();
    mat4.Multiply(viewProjectionMatrix, ship.viewMatrix, projectionMatrix);
    
    ship.update(deltaTime);
    ship.draw(viewProjectionMatrix);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, planetGeometry.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planetGeometry.indexBuffer);
    
    for(let i = 0; i < PLANETS.length; ++i)
        drawPlanet(PLANETS[i], viewProjectionMatrix);
    
    Skysphere.Draw(ship.viewMatrix, projectionMatrix);
    
    if(enablePostprocessing) Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
