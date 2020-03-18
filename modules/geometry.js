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

geom._cuboid_vertices = [
    -1, +1, +1,
    +1, +1, +1,
    +1, -1, +1,
    -1, -1, +1,
    -1, -1, -1,
    +1, -1, -1,
    +1, +1, -1,
    -1, +1, -1
];

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
geom._cuboid_indices_inverted = Array.from(geom._cuboid_indices).reverse();

geom.CuboidIndexed = function(sizeV, invert) {
    let hS = vec3.mulvs(sizeV, 0.5);
    
    let data = Array.from(geom._cuboid_vertices);
    for(let i = 0; i < data.length - 2; i += 3) {
        data[i] *= hS.x;
        data[i + 1] *= hS.y;
        data[i + 2] *= hS.z;
    }
    
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW); 
    
    var indices;
    if(invert)
        indices = Array.from(geom._cuboid_indices_inverted);
    else
        indices = Array.from(geom._cuboid_indices);
    
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
   return {
        "elementCount" : indices.length,
        "vertexBuffer" : vertexBuffer,
        "indexBuffer" : indexBuffer,
    };
}

const X = 0.525731112119133606;
const Z = 0.850650808352039932;
const N = 0.000000000000000000;

geom._icosahedron_vertices = [
    new vec3(-X, N, Z),
    new vec3(X, N, Z),
    new vec3(-X, N, -Z),
    new vec3(X, N, -Z),
    new vec3(N, Z, X),
    new vec3(N, Z, -X),
    new vec3(N, -Z, X), 
    new vec3(N, -Z, -X),
    new vec3(Z, X, N),
    new vec3(-Z, X, N),
    new vec3(Z, -X, N),
    new vec3(-Z, -X, N)
];
geom._icosahedron_indices = [
    0, 4, 1,
    0, 9, 4,
    9, 5, 4,
    4, 5, 8,
    4, 8, 1,
    8, 10, 1,
    8, 3, 10,
    5, 3, 8,
    5, 2, 3,
    2, 7, 3,
    7, 10, 3, 
    7, 6, 10, 
    7, 11, 6, 
    11, 0, 6, 
    0, 1, 6, 
    6, 1, 10, 
    9, 0, 11, 
    9, 11, 2, 
    9, 2, 5, 
    7, 2, 11
];
geom._icosahedron_indices_inverted = Array.from(geom._icosahedron_indices).reverse();

geom.Icosphere = function(radius, subdivisions, generateTexCoords, generateNormales, invert) {
    var indices;
    if(invert)
        indices = Array.from(geom._icosahedron_indices_inverted);
    else
        indices = Array.from(geom._icosahedron_indices);
    let verts = new Array(geom._icosahedron_vertices.length);
    let vi = 0;
    function push_vert(x, y, z, u, v) {
        verts[vi] = {
            'x' : x,
            'y' : y,
            'z' : z,
            'u' : u,
            'v' : v
        };
        vi++;
        return vi - 1;
    }
    for(let i = 0; i < geom._icosahedron_vertices.length; i++) {
        push_vert(geom._icosahedron_vertices[i].x, geom._icosahedron_vertices[i].y, geom._icosahedron_vertices[i].z, 0.5, 0.5);
    }
    
    function pair(a, b) {
        return a >= b ? a * a + a + b : a + b * b;
    }
    let mid = {};
    function middle(a, b) {
        let h = pair(a, b);
        if(mid.hasOwnProperty(h)) {
            return mid[h];
        } else {
            let vi = push_vert( 
                (verts[a].x + verts[b].x) * 0.5,
                (verts[a].y + verts[b].y) * 0.5,
                (verts[a].z + verts[b].z) * 0.5,
                (verts[a].u + verts[b].u) * 0.5,
                (verts[a].v + verts[b].v) * 0.5
            );
            let k = 1.0 / Math.sqrt(verts[vi].x * verts[vi].x + verts[vi].y * verts[vi].y + verts[vi].z * verts[vi].z);
            verts[vi].x *= k;
            verts[vi].y *= k;
            verts[vi].z *= k;
            mid[h] = vi;
            return vi;
        }
    }
    let tric = indices.length / 3;
    for(let si = 0; si < subdivisions; ++si) {
        for(let ti = 0; ti < tric; ti++) {
            let triIndex = ti * 3;
            let a = indices[triIndex];
            let b = indices[triIndex + 1];
            let c = indices[triIndex + 2];
            let mAB = middle(a, b);
            let mBC = middle(b, c);
            let mAC = middle(a, c);
            indices[triIndex] = mAB;
            indices[triIndex + 1] = mBC;
            indices[triIndex + 2] = mAC;
            indices.push(a, mAB, mAC);
            indices.push(mAB, b, mBC);
            indices.push(mAC, mBC, c);
        }
        tric *= 4;
    }
    
    let vertSize = 3 + (generateTexCoords ? 2 : 0) + (generateNormales ? 3 : 0);
    let buff = new Array(verts.length * vertSize);
    for(let i = 0; i < verts.length; i++) {
        let index = i * vertSize;
        buff[index] = verts[i].x;
        buff[index + 1] = verts[i].y;
        buff[index + 2] = verts[i].z;
        if(generateTexCoords) {
            buff[index + 3] = verts[i].u;
            buff[index + 4] = verts[i].v;
        }
        if(generateNormales) {
            let k = 1.0 / Math.sqrt(verts[i].x * verts[i].x + verts[i].y * verts[i].y + verts[i].z * verts[i].z); 
            buff[index + 5] = verts[i].x * k;
            buff[index + 6] = verts[i].y * k;
            buff[index + 7] = verts[i].z * k;
        }
    }
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buff), gl.STATIC_DRAW); 
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    return {
        "elementCount" : indices.length,
        "vertexBuffer" : vertexBuffer,
        "indexBuffer" : indexBuffer
    };
};