const socket = io(); 
var gameState;

initialize();

socket.on("game_state", function(state){
    gameState = state;
}); 

var t = 0;
var time_last = 0;
var first_run = true;
for(var i = 0; i < 10; i++)
for(var j = 0; j < 10; j++)
ParticlesEmit(new Vector3(i - 5, 35 + j, -100), 
new Vector3(0, 0, 0), 
new Vector3(0, 0, 0.5), 
new Vector3(i, j, i * j), 
new Vector3(10 - i, 10 - j, 0),
new Vector2(.1, .1), 
new Vector2(.1, .1),
i + j * 0.5 + 1);

function loop(time_now) {
    if(gameState === undefined) {
        requestAnimationFrame(loop);
        return;
    }
    var ships = gameState[0];
    var planets = gameState[1];
    var lasers = gameState[2];
    
    Postprocessing.BeginDrawing();          
    
    if(first_run) { time_last = time_now; first_run = false; }
    let deltaTime = 0.001 * (time_now - time_last);
    time_last = time_now;
    t += deltaTime;
    
    var myship;
    for(var i = 0; i < ships.length; ++i) {
        if(socket.id == ships[i].id) {
            myship = ships[i];
            break;
        }
    }

    for(var i = 0; i < lasers.length; ++i) {
        ParticlesEmit(lasers[i].position, 
        Vector3.mulvs(lasers[i].velocity, -0.05), 
        Vector3.mulvs(lasers[i].velocity, 0.01), 
        new Vector3(0, 8, 15), 
        new Vector3(0, 0, 0),
        new Vector2(.07, .07), 
        new Vector2(0, 0),
        1);
    }

    //for test
    const viewMatrix = new Matrix4();
    let camoff = Vector3.add( Vector3.add(
        Vector3.mulvs(myship.transform.right, cameraOffset.x),
        Vector3.mulvs(myship.transform.up, cameraOffset.y)), 
        Vector3.mulvs(myship.transform.forward, cameraOffset.z));
    let campos = Vector3.add(myship.transform.position, camoff);

    Matrix4.LookAt(viewMatrix, campos, Vector3.add(campos, myship.transform.forward), myship.transform.up);
    const mat_translation = new mat4();
    const mat_rotation = new mat4();
    const mat_scale = new mat4();
    const mat_world = new mat4();

    let viewProjectionMatrix = new Matrix4();
    Matrix4.Multiply(viewProjectionMatrix, viewMatrix, projectionMatrix);

    ParticlesUpdateDraw(deltaTime, campos, myship.transform.up, viewProjectionMatrix);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, planetGeometry.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planetGeometry.indexBuffer);
    for(let i = 0; i < ships.length; ++i) {
        Matrix4.Translation(mat_translation, ships[i].transform.position);
        Matrix4.Scale(mat_scale, ships[i].transform.scale);
        Quaternion.ToMatrix(ships[i].transform.quaternion, mat_rotation);
        Matrix4.World(mat_world, mat_scale, mat_translation, mat_rotation);
        
        tchDefault.Use(planets[0].transform.position);
        tchDefault.SetTexture(PLANETS_DATA[0].texture0);
        tchDefault.SetupAttributes();
        tchDefault.SetWorldMatrix(mat_world);
        tchDefault.SetRotationMatrix(mat_rotation);
        tchDefault.SetViewProjectionMatrix(viewProjectionMatrix);
        gl.drawElements(gl.TRIANGLES, planetGeometry.elementCount, gl.UNSIGNED_SHORT, 0);
        tchDefault.DisableAttributes();
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, planetGeometry.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planetGeometry.indexBuffer);
    for(let i = 0; i < planets.length; ++i) {
        Matrix4.Translation(mat_translation, planets[i].transform.position);
        Matrix4.Scale(mat_scale, planets[i].transform.scale);
        Quaternion.ToMatrix(planets[i].transform.quaternion, mat_rotation);
        Matrix4.World(mat_world, mat_scale, mat_translation, mat_rotation);

        PLANETS_DATA[i].technique.Use(planets[0].transform.position);
        PLANETS_DATA[i].technique.SetTextures(PLANETS_DATA[i].texture0, PLANETS_DATA[i].texture1, PLANETS_DATA[i].texture2);
        PLANETS_DATA[i].technique.SetupAttributes();
        PLANETS_DATA[i].technique.SetWorldMatrix(mat_world);
        PLANETS_DATA[i].technique.SetRotationMatrix(mat_rotation);
        PLANETS_DATA[i].technique.SetViewProjectionMatrix(viewProjectionMatrix);
        gl.drawElements(gl.TRIANGLES, planetGeometry.elementCount, gl.UNSIGNED_SHORT, 0);
        PLANETS_DATA[i].technique.DisableAttributes();
    }
    
    Skysphere.Draw(viewMatrix, projectionMatrix);
    Postprocessing.EndDrawing();
    requestAnimationFrame(loop);
}

setInterval(sendInput, 33);
requestAnimationFrame(loop);