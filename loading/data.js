function loadImage(src, onload) {
    let image = new Image();
    image.onload = function() { onload(image); };
    image.crossOrigin = "anonymous";
    image.src = src;
}
function loadTexture(src, minFilter, magFilter, wrapS, wrapT){
    minFilter = (minFilter === undefined) ? gl.LINEAR : minFilter;
    magFilter = (magFilter === undefined) ? gl.LINEAR : magFilter;
    wrapS = (wrapS === undefined) ? gl.CLAMP_TO_EDGE : wrapS;
    wrapT = (wrapT === undefined) ? gl.CLAMP_TO_EDGE : wrapT;
    
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
//SYNC!
function loadText(src, onload) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", src, false);

    oReq.onload = function (oEvent) {
        onload(oReq.responseText);
    };

    oReq.send(null);
}

const CUBEMAP_TARGET = [
    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
];

function loadCubemapTexture(textures, minFilter, magFilter) {
    minFilter = (minFilter === undefined) ? gl.NEAREST : minFilter;
    magFilter = (magFilter === undefined) ? gl.NEAREST : magFilter;
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

/* TECHNIQUES */

var tchPlanet = new TechniquePlanet();
var tchPostProcessing = new TechniquePostProcessing();
var tchSun = new TechniqueSun();
var tchEarth = new TechniqueEarth();
var tchSkybox = new TechniqueSkybox();
Postprocessing.Initialize(tchPostProcessing);

/* PLANETS */

function loadPlanets(...planets) {
    for(let i = 0; i < planets.length; i++) {
        if(planets[i].technique === undefined) planets[i].technique = tchPlanet;
        planets[i].texture0 = loadTexture(planets[i].srcTexture0);
        if(planets[i].srcTexture1 !== undefined) planets[i].texture1 = loadTexture(planets[i].srcTexture1);
        if(planets[i].srcTexture2 !== undefined) planets[i].texture2 = loadTexture(planets[i].srcTexture2);
        
        //pre-cached matrices
        planets[i].mat_rotation = new mat4();
        planets[i].mat_scale = new mat4();
        planets[i].mat_translation = new mat4();
        planets[i].mat_world = new mat4();
        
        //scale never changes, compute now
        mat4.Scale(planets[i].mat_scale, vec3.fromScalar(planets[i].radius));
    }
}

var planetGeometry = geom.Sphere(planetParallels, planetMeridians, 1.0, true, true);

SUN.technique = tchSun;
EARTH.technique = tchEarth;

loadPlanets(SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE);

let wtf = "data:image/jpeg;base64,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";

Skybox.texture = loadCubemapTexture([
    wtf, wtf, wtf, wtf, wtf, wtf
]); //Skybox
Skybox.Initialize();
