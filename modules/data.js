function loadImage(src, onload) {
    let image = new Image();
    image.onload = function() { onload(image); };
    image.crossOrigin = "anonymous";
    image.src = src;
}
function loadTexture(src, minFilter, magFilter, wrapS, wrapT){
    minFilter = default_arg(minFilter, gl.LINEAR);
    magFilter = default_arg(magFilter, gl.LINEAR);
    wrapS = default_arg(wrapS, gl.CLAMP_TO_EDGE);
    wrapT = default_arg(wrapT, gl.CLAMP_TO_EDGE);
    
    let singleTexture = gl.createTexture();
    loadImage(src, function(img){
        gl.bindTexture(gl.TEXTURE_2D, singleTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    });
    return singleTexture;
}

function loadText(src, onload) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", src, false);

    if(onload){
        oReq.onload = function (oEvent) {
            onload(oReq.responseText);
        };
    }
    else{
        return oReq.responseText;
    }

    oReq.send(null);
}
var modelShip;
function loadModel(src){
    let txt = loadText(src);
    let text = txt.split('\n').join().split(' ').join().split(',');
    let verticals = [];
    let textureCoords = [];
    let normals = [];
    let result = [];
    for(let i = 0;i < text.length;i++){
        if(text[i] == "v"){
            verticals.push(text[i+1]);
            verticals.push(text[i+2]);
            verticals.push(text[i+3]);
            i+=3;
        }
        if(text[i] == "vt"){
            textureCoords.push(text[i+1]);
            textureCoords.push(text[i+2]);
            i+=2;
        }
        if(text[i] == "vn"){
            normals.push(text[i+1]);
            normals.push(text[i+2]);
            normals.push(text[i+3]);
            i+=3;
        }
        if(text[i] == "f"){
            result.push(verticals[text[i+1].split('/')[0]]);
            result.push(textureCoords[text[i+1].split('/')[1]]);
            result.push(normals[text[i+1].split('/')[2]]);
            result.push(verticals[text[i+2].split('/')[0]]);
            result.push(textureCoords[text[i+2].split('/')[1]]);
            result.push(normals[text[i+2].split('/')[2]]);
            result.push(verticals[text[i+3].split('/')[0]]);
            result.push(textureCoords[text[i+3].split('/')[1]]);
            result.push(normals[text[i+3].split('/')[2]]);
            i+=3;
        }
    }
    var vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(result), gl.STATIC_DRAW);
    return {
        "vertexCount" : result.length,
        "vertexBuffer" : vertBuffer
    };
}


function loadCubemapTexture(textures, minFilter, magFilter) {
    const CUBEMAP_TARGET = [
        gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ];
    
    minFilter = default_arg(minFilter, gl.LINEAR);
    magFilter = default_arg(magFilter, gl.LINEAR);
    var texture = gl.createTexture();
    for(let i = 0; i < textures.length; i++) {
        loadImage(textures[i], function(img){
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(CUBEMAP_TARGET[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, minFilter);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, magFilter);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        });
    }
    return texture;
}

function loadPlanets(...planets) {
    for(let i = 0; i < planets.length; i++) {
        if(planets[i].technique === undefined) 
            planets[i].technique = tchPlanet;
        
        planets[i].texture0 = loadTexture(planets[i].srcTexture0, gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
        
        if(planets[i].srcTexture1 !== undefined) 
            planets[i].texture1 = loadTexture(planets[i].srcTexture1, gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
        if(planets[i].srcTexture2 !== undefined) 
            planets[i].texture2 = loadTexture(planets[i].srcTexture2, gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
        
        //pre-cached matrices
        planets[i].mat_rotation = new mat4();
        planets[i].mat_scale = new mat4();
        planets[i].mat_translation = new mat4();
        planets[i].mat_world = new mat4();
        planets[i].mat = new mat4();
        planets[i].mat_rotation.identity();
        
        //scale never changes, compute now
        mat4.Scale(planets[i].mat_scale, vec3.fromScalar(planets[i].radius));
    }
}

var tchPlanet, tchSun, tchEarth, tchDefault;
var planetGeometry;


function loadData() {
    tchDefault = new TechniqueDefault();
    tchPlanet = new TechniquePlanet();
    tchSun = new TechniqueSun();
    tchEarth = new TechniqueEarth();
    
    //var planetGeometry = geom.Icosphere(1.0, 6, true, true);
    planetGeometry = geom.UVSphere(planetParallels, planetMeridians, 1.0, true, true);

    SUN.technique = tchSun;
    EARTH.technique = tchEarth;

    loadPlanets(SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE);
    
    let wtf = "https://i.ibb.co/vYxRpF4/PSX-20200316-115002.jpg";
    Skysphere.texture = loadCubemapTexture([
        wtf, wtf, wtf, wtf, wtf, wtf
    ]);
    
    
    /*gl.bindBuffer(gl.ARRAY_BUFFER, modelShip.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0, 0, -4, 0.5, 1, 0, 1, 0,
        -2, 0, 2, 0, 0, 0, 1, 0,
        2, 0, 2, 1, 0, 0, 1, 0
    ]), gl.STATIC_DRAW); */
    
    ship = new Ship(loadModel("./models/ship.obj"), tchDefault, SUN.texture0, SHIP_START_POSITION, SHIP_MASS, SHIP_SCALE, SHIP_CAMERA_OFFSET);
}