class TechniqueBloomBlur extends Technique {
    constructor() {
        super();
        let self = this;
        loadText("./technique/posteffects/bloom_blur.comp", function(txt){   
            self.AddShader(gl.COMPUTE_SHADER, txt);
        });
        super.Link();
        this.locationHorizontal = this.GetUniformLocation("uHorizontal");
    }
    Run(inputColor, blurred, screenSize, horizontal) {
        super.Use();
        gl.uniform1i(this.locationHorizontal, horizontal ? 1 : 0);

        gl.bindTexture(gl.TEXTURE_2D, inputColor);
        gl.bindImageTexture(1, inputColor, 0, false, 0, gl.READ_ONLY, gl.RGBA16F);
        gl.bindTexture(gl.TEXTURE_2D, blurred);
        gl.bindImageTexture(2, blurred, 0, false, 0, gl.WRITE_ONLY, gl.RGBA16F);
        
        gl.dispatchCompute(screenSize.x / 16 + 1, screenSize.y / 16 + 1, 1);
        //gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT); //?
    }
}