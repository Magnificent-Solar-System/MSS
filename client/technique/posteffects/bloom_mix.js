class TechniqueBloomMix extends Technique {
    constructor() {
        super();
        let self = this;
        loadText("./technique/posteffects/bloom_mix.comp", function(txt){   
            self.AddShader(gl.COMPUTE_SHADER, txt);
        });
        super.Link();
    }
    Run(inputTexture, inputBlurredBright, outputTexture, screenSize) {
        super.Use();
        
        gl.bindTexture(gl.TEXTURE_2D, inputTexture);
        gl.bindImageTexture(1, inputTexture, 0, false, 0, gl.READ_ONLY, gl.RGBA16F);
        gl.bindTexture(gl.TEXTURE_2D, inputBlurredBright);
        gl.bindImageTexture(2, inputBlurredBright, 0, false, 0, gl.READ_ONLY, gl.RGBA16F);
        gl.bindTexture(gl.TEXTURE_2D, outputTexture);
        gl.bindImageTexture(3, outputTexture, 0, false, 0, gl.WRITE_ONLY, gl.RGBA16F);
        
        gl.dispatchCompute(screenSize.x / 16 + 1, screenSize.y / 16 + 1, 1);
        //gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT); //?
    }
}