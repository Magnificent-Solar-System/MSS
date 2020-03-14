function drawSkybox(viewMatrix, projectionMatrix) {
    gl.depthMask(GL_FALSE);
    tchSkybox.Use(viewMatrix, projectionMatrix);
    //draw unit cube
    gl.depthMask(GL_TRUE);
}