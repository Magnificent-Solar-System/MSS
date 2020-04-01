function ParticlesInitialize() {
    particlesParticleBytes = 80;
    particlesBufferSize = particlesParticleBytes * 16000;

    particlesDrawTechnique = new TechniqueParticlesDraw();
    particlesUpdateTechnique = new TechniquуParticlesUpdate();
    particlesVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, particlesVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -0.5, -0.5,
        0.5, -0.5,
        0.5, 0.5,

        -0.5, -0.5,
        0.5, 0.5,
        -0.5, 0.5
    ]), gl.STATIC_DRAW);

    particlesCurrentSSBO = 0;
    particlesSSBO = [gl.createBuffer(), gl.createBuffer()];
    for(var i = 0; i < 2; i++) {
        gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, particlesSSBO[i]);
        //gl.bufferData(gl.SHADER_STORAGE_BUFFER, new Float32Array([0, 39, -100, 0.0, 8.0, 15.0, 0.5, 0.5]), gl.DYNAMIC_COPY);
        gl.bufferData(gl.SHADER_STORAGE_BUFFER, particlesBufferSize, gl.DYNAMIC_COPY);
    }

    particlesAtomicCounterBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ATOMIC_COUNTER_BUFFER, particlesAtomicCounterBuffer);
    gl.bufferData(gl.ATOMIC_COUNTER_BUFFER, new Uint32Array([1]), gl.DYNAMIC_COPY);

    particlesStack = [];
    particlesStackSize = 0;
    particlesCount = 0;
}
function ParticlesUpdateDraw(deltaTime, campos, camup, viewProjectionMatrix) {
    let nextSSBO = particlesCurrentSSBO === 0 ? 1 : 0; 
    particlesCount = particlesUpdateTechnique.Run(deltaTime, particlesSSBO[particlesCurrentSSBO], particlesSSBO[nextSSBO], particlesAtomicCounterBuffer, particlesCount);    
    particlesCurrentSSBO = nextSSBO;

    gl.memoryBarrier(gl.VERTEX_ATTRIB_ARRAY_BARRIER_BIT | gl.ATOMIC_COUNTER_BARRIER_BIT | gl.SHADER_STORAGE_BARRIER_BIT);     

    if(particlesStackSize !== 0) {
        gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, particlesSSBO[particlesCurrentSSBO]);
        gl.bufferSubData(gl.SHADER_STORAGE_BUFFER, particlesParticleBytes * particlesCount, new Float32Array(particlesStack));
        particlesCount += particlesStackSize;
        particlesStackSize = 0;
        particlesStack.length = 0;
    }

    particlesDrawTechnique.Use();
    particlesDrawTechnique.SetCameraParameters(campos, camup);
    particlesDrawTechnique.SetViewProjectionMatrix(viewProjectionMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, particlesVertexBuffer);
    particlesDrawTechnique.SetupAttributesGeneral();
    gl.bindBuffer(gl.ARRAY_BUFFER, particlesSSBO[particlesCurrentSSBO]);
    particlesDrawTechnique.SetupAttributesIndividual();
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, particlesCount);
    particlesDrawTechnique.DisableAttributes();
}
function ParticlesEmit(pos, vel, accel, color, colorChange, size, sizeChange, life) { 
    ++particlesStackSize;
    particlesStack.push(pos.x, pos.y, pos.z, vel.x, vel.y, vel.z, accel.x, accel.y, accel.z,
        color.x, color.y, color.z, colorChange.x, colorChange.y, colorChange.z, 
        size.x, size.y, sizeChange.x, sizeChange.y, life);
}