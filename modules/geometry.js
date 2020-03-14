function geomSphere(parallelsCount, meridiansCount, radius, generateNormales, generateTexCoords) {
    generateNormales = (generateNormales === undefined ? false : generateNormales);
    generateTexCoords = (generateTexCoords === undefined ? false : generateTexCoords);
    let vertices = [];
    for(let i = 0; i <= parallelsCount; ++i) {
        let theta = Math.PI * i / parallelsCount;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);
        for(let j = 0; j <= meridiansCount; ++j) {
            let phi = DoublePI * j / meridiansCount;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);
            
            let nx = cosPhi * sinTheta;
            var ny = cosTheta;
            var nz = sinPhi * sinTheta;
            
            vertices.push(radius * nx, radius * ny, radius * nz);
            if(generateTexCoords) {
                let u = 1 - (j / meridiansCount);
                let v = 1 - (i / parallelsCount);
                vertices.push(u, v);
            }
            if(generateNormales) vertices.push(nx, ny, nz);
        }
    }
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); 
    
    let indices = [];
    for(let i = 0; i < parallelsCount; ++i) {
        for(let j = 0; j < meridiansCount; ++j) {
            var first = i * (meridiansCount + 1) + j;
            var second = first + meridiansCount + 1;
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
    return {
        "elementCount" : indices.length,
        "vertexBuffer" : vertexBuffer,
        "indexBuffer" : indexBuffer,
    };
}

function geomCuboid(sizeV, strFormat) {
    let hS = vec3.mulvs(sizeV, 0.5);
    strFormat = (strFormat === undefined) ? "v" : strFormat;
    let data = [];
    
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW); 
    
    let indices = [];
    
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
   return {
        "elementCount" : indices.length,
        "vertexBuffer" : vertexBuffer,
        "indexBuffer" : indexBuffer,
    };
}