function drawPlanet(planet, viewProjectionMatrix) {
    mat4.Translation(planet.mat_translation, planet.position);
    mat4.World(planet.mat_world, planet.mat_scale, planet.mat_translation, planet.mat_rotation);

    mat4.Multiply(planet.mat, planet.mat_world, viewProjectionMatrix);
    
    planet.technique.Use();
    planet.technique.SetTextures(planet.texture0, planet.texture1, planet.texture2);
    planet.technique.SetupAttributes();
    planet.technique.SetAdditionalMatrices(planet);
    planet.technique.SetMatrix(planet.mat);
    gl.drawElements(gl.TRIANGLES, planetGeometry.elementCount, gl.UNSIGNED_SHORT, 0);
    planet.technique.DisableAttributes();
}