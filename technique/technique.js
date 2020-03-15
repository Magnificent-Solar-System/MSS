const TECHNIQUE_SHADER_GLSL_VERSION_PREFIX = "#version 300 es\n";
var SIZEOF_TYPE = new Object();

class Technique {
    constructor() {
        this.program = gl.createProgram();  
        this.shaders = [];
    }
    AddShader(type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, TECHNIQUE_SHADER_GLSL_VERSION_PREFIX + source);
        gl.compileShader(shader); 
        console.debug(type, gl.getShaderInfoLog(shader));      
        gl.attachShader(this.program, shader);    
        this.shaders.push(shader);
    }
    /* links program and deletes shaders */
    Link() {
        gl.linkProgram(this.program);
        let err = gl.getError(); 
        if(err !== gl.NO_ERROR) { console.error(err); }
        for(let i = 0; i < this.shaders.length; i++) {
            gl.deleteShader(this.shaders[i]);
        }
        this.shaders.length = 0;
    }
    
    LoadShaders(fileNameWithoutExtension) {
        let self = this;
        loadText(fileNameWithoutExtension + ".frag", function(txt){   
            self.AddShader(gl.FRAGMENT_SHADER, txt);
        });
        loadText(fileNameWithoutExtension + ".vert", function(txt){   
            self.AddShader(gl.VERTEX_SHADER, txt);
        });
    }
    
    /* 
    [ name, componentsCount, componentsType ] 
    supports only continious arrays, dont uses vertexAttribIPointer
    */
    InitializeAttributes(...info) {
        this.attribLocations = new Array(info.length);
        this.attribInfo = new Array(info.length);
        let offset = 0;
        for(let i = 0; i < info.length; i++) {
            
            
            this.attribLocations[i] = this.GetAttribLocation(info[i][0]);
            this.attribInfo[i] = [
                info[i][1],
                info[i][2],
                (info[i].length == 3 ? false : info[i][3]),
                offset
            ];
            offset += SIZEOF_TYPE[info[i][2]] * info[i][1];

        }
        this.stride = offset;
    }
    
    SetupAttributes() {
        for(let i = 0; i < this.attribLocations.length; i++) {
            gl.enableVertexAttribArray(this.attribLocations[i]); 
            gl.vertexAttribPointer(this.attribLocations[i], this.attribInfo[i][0], this.attribInfo[i][1], this.attribInfo[i][2], this.stride, this.attribInfo[i][3]);
        }
    }
    DisableAttributes() {
        for(let i = 0; i < this.attribLocations.length; ++i) {
            gl.disableVertexAttribArray(this.attribLocations[i]);
        }
    }
    Use() {
        gl.useProgram(this.program);
    }
    GetUniformLocation(uniformName) {
        return gl.getUniformLocation(this.program, uniformName);
    }
    GetAttribLocation(attribName) {
        return gl.getAttribLocation(this.program, attribName);
    }
    
    static Initialize() {
        SIZEOF_TYPE[gl.FLOAT] = 4;
        SIZEOF_TYPE[gl.BYTE] = 1;
        SIZEOF_TYPE[gl.SHORT] = 2;
        SIZEOF_TYPE[gl.UNSIGNED_BYTE] = 1;
        SIZEOF_TYPE[gl.UNSIGNED_SHORT] = 2;
        SIZEOF_TYPE[gl.HALF_FLOAT] = 2;
    }
}

