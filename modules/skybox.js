var Skybox = {};
Skybox.Initialize = function () {
    Skybox.Cube = geom.CuboidIndexed(new vec3(1, 1, 1));
}
Skybox.Draw = function (viewMatrix, projectionMatrix) {
    gl.depthMask(false);
    tchSkybox.Use(viewMatrix, projectionMatrix);
    tchSkybox.SetTexture(Skybox.texture);
    gl.bindBuffer(gl.ARRAY_BUFFER, Skybox.Cube.vertexBuffer);
    tchSkybox.SetupAttributes();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Skybox.Cube.indexBuffer);
    gl.drawElements(gl.TRIANGLES, Skybox.Cube.elementCount, gl.UNSIGNED_SHORT, 0);
    tchSkybox.DisableAttributes();
    gl.depthMask(true);
}