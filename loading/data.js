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

    oReq.onload = function (oEvent) {
        onload(oReq.responseText);
    };

    oReq.send(null);
}

function loadModel(txt){
    let text = txt.split('\n').join().split(' ').join().split(',');
    let verticals = [];
    let textureCoords = [];
    let normals = [];
    let index = [];
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
            let ind = text[i+1].split('/');
            for(let k = 0;k<ind.length;k++){
                index.push(ind[k]);
            }
            ind = text[i+1].split('/');
            for(let k = 0;k<ind.length;k++){
                index.push(ind[k]);
            }
            ind = text[i+2].split('/');
            for(let k = 0;k<ind.length;k++){
                index.push(ind[k]);
            }
        }
    }
    return [verticals,textureCoords,normals,index];
}
loadText("./models/ship.obj", loadModel);

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

var tchPlanet, tchSun, tchEarth;
var planetGeometry;

function loadData() {
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
}