class Body {
    constructor(pos, vel, mass, radius, genTexCoords, genNormales ,tex, src , num) {
        this.sphere = createSphere(planetParallels, planetMeridians, radius, genTexCoords, genNormales);
        this.radius = radius;
        this.mass = mass;
        this.velocity = vel;
        this.position = pos;
        this.worldMatrix = new mat4();
        this.src = src;
        this.num = num;
        this.tex = tex;
    }
    bindArrayBuffer() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.sphere.vertexBuffer);
    }
    LoadTexture(n) {
    let singleTexture = gl.createTexture();
    singleTexture.image = new Image();
    singleTexture.image.onload = function(){
        gl.bindTexture(gl.TEXTURE_2D, singleTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, singleTexture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        let texture = "TEXTURE" + String(n);
        gl.activeTexture(gl.texture);
        gl.bindTexture(gl.TEXTURE_2D, singleTexture);  
    }
    singleTexture.image.crossOrigin = "anonymous";
    singleTexture.image.src = this.src;
}
    draw() {
        if(this.tex)this.LoadTexture(this.num);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sphere.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.sphere.elementCount, gl.UNSIGNED_SHORT, 0);
    }
}