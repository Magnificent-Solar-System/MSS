function drawPlanet(planet, viewProjectionMatrix) {
    planet.mat_rotation.identity();
    mat4.Translation(planet.mat_translation, planet.position);
    mat4.World(planet.mat_world, planet.mat_scale, planet.mat_translation, planet.mat_rotation);
        
    planet.technique.Use();
    planet.technique.SetTextures(planet.texture0, planet.texture1, planet.texture2);
    planet.technique.SetupAttributes();
    if(planet.separateWorldMatrix === undefined || planet.separateWorldMatrix) {
        planet.technique.SetWorldMatrix(planet.mat_world);
        planet.technique.SetViewProjectionMatrix(viewProjectionMatrix);
    } else {
        let matrix = new mat4();
        mat4.Multiply(matrix, planet.mat_world, viewProjectionMatrix);
        planet.technique.SetMatrix(matrix);
    }
    gl.drawElements(gl.TRIANGLES, planetGeometry.elementCount, gl.UNSIGNED_SHORT, 0);
    planet.technique.DisableAttributes();
}