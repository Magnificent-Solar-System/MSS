camera = new Camera(new vec3(0,50, -50), 0, 0, 0);

requestAnimationFrame(mainLoop); //todo: run after loading complete : or main executed after loading only? async textures loading...

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
      
    gl.bindBuffer(gl.ARRAY_BUFFER, planetGeometry.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planetGeometry.indexBuffer);
    
    
    let viewProjectionMatrix = new mat4();
    mat4.Multiply(viewProjectionMatrix, camera.viewMatrix,  Postprocessing.projectionMatrix);
    
    for(let i = 1; i < PLANETS.length; ++i) {
        PLANETS[i].mat_rotation.identity();
        mat4.Translation(PLANETS[i].mat_translation, PLANETS[i].position);
        mat4.World(PLANETS[i].mat_world, PLANETS[i].mat_scale, PLANETS[i].mat_translation, PLANETS[i].mat_rotation);
        
        PLANETS[i].technique.Use();
        PLANETS[i].technique.SetTextures(PLANETS[i].texture0, PLANETS[i].texture1, PLANETS[i].texture2);
        PLANETS[i].technique.SetupAttributes();
        PLANETS[i].technique.SetWorldMatrix(PLANETS[i].mat_world);
        PLANETS[i].technique.SetViewProjectionMatrix(viewProjectionMatrix);
        gl.drawElements(gl.TRIANGLES, planetGeometry.elementCount, gl.UNSIGNED_SHORT, 0);
        PLANETS[i].technique.DisableAttributes();
    }
    SUN.mat_rotation.identity();
    mat4.Translation(SUN.mat_translation, SUN.position);
    mat4.World(SUN.mat_world, SUN.mat_scale, SUN.mat_translation, SUN.mat_rotation);
    let matrix = new mat4();
    mat4.Multiply(matrix, SUN.mat_world, viewProjectionMatrix);
    
    SUN.technique.Use(matrix);
    SUN.technique.SetupAttributes();
    gl.drawElements(gl.TRIANGLES, planetGeometry.elementCount, gl.UNSIGNED_SHORT, 0);
    SUN.technique.DisableAttributes();
    
    if(enablePostprocessing) Postprocessing.EndDrawing();
    requestAnimationFrame(mainLoop);
}
