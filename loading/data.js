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

let wtf = "https://i.ibb.co/vYxRpF4/PSX-20200316-115002.jpg";
Skybox.texture = loadCubemapTexture([
    wtf, wtf, wtf, wtf, wtf, wtf
]); //Skybox
Skybox.Initialize();
