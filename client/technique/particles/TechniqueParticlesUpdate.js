class TechniquуParticlesUpdate extends Technique {
    constructor() {
        super();
        let self = this;
        loadText("./technique/particles/TechniqueParticlesUpdate.comp", function(txt){   
            self.AddShader(gl.COMPUTE_SHADER, txt);
        });
        super.Link();
        this.locationDeltaTime = this.GetUniformLocation("uDeltaTime");
    }
    Run(deltaTime, inputBuffer, outputBuffer, atomicCounterBuffer, prevCount) {
        super.Use();
        gl.uniform1f(this.locationDeltaTime, deltaTime);
        gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 0, inputBuffer);
        gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 1, outputBuffer);
        gl.bindBufferBase(gl.ATOMIC_COUNTER_BUFFER, 2, atomicCounterBuffer);

        gl.bindBuffer(gl.ATOMIC_COUNTER_BUFFER, atomicCounterBuffer);
        gl.memoryBarrier(gl.ATOMIC_COUNTER_BARRIER_BIT);
        gl.bufferSubData(gl.ATOMIC_COUNTER_BUFFER, 0, new Uint32Array([0]));
        gl.dispatchCompute(prevCount, 1, 1);
        var count = new Uint32Array(1);
        gl.getBufferSubData(gl.ATOMIC_COUNTER_BUFFER, 0, count);
        return count[0];
    }
}