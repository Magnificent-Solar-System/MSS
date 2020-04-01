class TechniqueBloomBright extends Technique {
    constructor() {
        super();
        let self = this;
        loadText("./technique/posteffects/bloom_bright.comp", function(txt){   
            self.AddShader(gl.COMPUTE_SHADER, txt);
        });
        super.Link();
    }
    Run(inputColor, bright, screenSize) {
        super.Use();
        
        gl.bindTexture(gl.TEXTURE_2D, inputColor);
        gl.bindImageTexture(1, inputColor, 0, false, 0, gl.READ_ONLY, gl.RGBA16F);
        gl.bindTexture(gl.TEXTURE_2D, bright);
        gl.bindImageTexture(2, bright, 0, false, 0, gl.WRITE_ONLY, gl.RGBA16F);
        
        gl.dispatchCompute(screenSize.x / 16 + 1, screenSize.y / 16 + 1, 1);
        //gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT); //?
    }
}