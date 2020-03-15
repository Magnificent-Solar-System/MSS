var geom = {}
geom.Sphere = function(parallelsCount, meridiansCount, radius, generateNormales, generateTexCoords) {
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

geom._cuboid_indices = [
            0, 1, 3, //Front
            1, 2, 3, //
            1, 6, 2, //Right
            6, 5, 2, //
            0, 7, 6, //Up
            6, 1, 0, //
            3, 2, 5, //Down
            5, 4, 3, //
            7, 0, 3, //Left
            7, 3, 4, //
            7, 4, 5, //Back
            7, 5, 6  // 
        ];
geom._cuboid_indices_inverted = [
            3, 1, 0, //Front
            3, 2, 1, //
            2, 6, 1, //Right
            2, 5, 6, //
            6, 7, 0, //Up
            0, 1, 6, //
            5, 2, 3, //Down
            3, 4, 5, //
            3, 0, 7, //Left
            4, 3, 7, //
            5, 4, 7, //Back
            6, 5, 7  // 
        ];


geom.CuboidIndexed = function(sizeV, inside) {
    
    let hS = vec3.mulvs(sizeV, 0.5);
    let data = [
        -hS.x, +hS.y, +hS.z,
        +hS.x, +hS.y, +hS.z,
        +hS.x, -hS.y, +hS.z,
        -hS.x, -hS.y, +hS.z,
        -hS.x, -hS.y, -hS.z,
        +hS.x, -hS.y, -hS.z,
        +hS.x, +hS.y, -hS.z,
        -hS.x, +hS.y, -hS.z
    ];
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW); 
    
    var indices;
    
    if(inside)
        indices = geom._cuboid_indices_inverted;
    else
        indices = geom._cuboid_indices;
    
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
   return {
        "elementCount" : indices.length,
        "vertexBuffer" : vertexBuffer,
        "indexBuffer" : indexBuffer,
    };
}