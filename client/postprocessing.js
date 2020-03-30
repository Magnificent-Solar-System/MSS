class Postprocessing {
    static frameBuffer;
    static targetTexture;
    static technique;
    static projectionMatrix;
    static vertexBuffer;
    
    static Initialize(techniquePostProcessing) {
        this.technique = new TechniquePostProcessing();
        this.posteffect = new TechniquePosteffect();
        
        this.targetTextureWidth = canvas.width;
        this.targetTextureHeight = canvas.height;
        
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            -1, 1,
            1, -1,
            1, 1
        ]), gl.STATIC_DRAW); 
        
        this.targetTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);
        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, this.targetTextureWidth, this.targetTextureHeight, 0, gl.RGBA, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, this.targetTextureWidth, this.targetTextureHeight);
        
        this.temporaryTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.temporaryTexture);
        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, this.targetTextureWidth, this.targetTextureHeight, 0, gl.RGBA, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, this.targetTextureWidth, this.targetTextureHeight);
        
        this.depthTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, this.targetTextureWidth, this.targetTextureHeight, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT24, this.targetTextureWidth, this.targetTextureHeight);
        
        this.frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.frameBuffer);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.targetTexture, 0);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
    }
    
    static BeginDrawing() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.viewport(0, 0, this.targetTextureWidth, this.targetTextureHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const aspectRatio = this.targetTextureWidth / this.targetTextureHeight;
        mat4.Perspective(projectionMatrix, aspectRatio, zNearPlane, zFarPlane, fov);
    }
    
    static EndDrawing() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        let screenSize = new  vec2(this.targetTextureWidth, this.targetTextureHeight);
        this.posteffect.Run(this.targetTexture, this.depthTexture, this.temporaryTexture, screenSize);
        
        this.technique.Use(this.temporaryTexture);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        this.technique.SetupAttributes();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        this.technique.DisableAttributes();
    }
}