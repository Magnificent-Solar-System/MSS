class TechniquePosteffect extends Technique {
    constructor() {
        super();
        let self = this;
        loadText("./technique/posteffects/posteffect.comp", function(txt){   
            self.AddShader(gl.COMPUTE_SHADER, txt);
        });
        //this.locationDepthSampler = this.GetUniformLocation("depthTexture");
        super.Link();
    }
    Run(inputColor, inputDepth, outputColor, screenSize) {
        super.Use();
        
        gl.bindTexture(gl.TEXTURE_2D, inputColor);
        gl.bindImageTexture(1, inputColor, 0, false, 0, gl.READ_ONLY, gl.RGBA16F);
        gl.bindTexture(gl.TEXTURE_2D, outputColor);
        gl.bindImageTexture(2, outputColor, 0, false, 0, gl.WRITE_ONLY, gl.RGBA16F);
        
        /*gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(this.locationDepthSampler, 0);
        gl.bindTexture(gl.TEXTURE_2D, inputDepth);*/
        //gl.bindImageTexture(1, inputDepth, 0, false, 0, gl.READ_ONLY, gl.R32F);
        
        gl.dispatchCompute(screenSize.x / 16 + 1, screenSize.y / 16 + 1, 1);
        gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT);
    }
}