class vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    
    static copy(v4) {
        return new vec4(v4.x, v4.y, v4.z, v4.w);
    }
    //change name?
    static fromV3W(v3, w) {
        return new vec4(v3.x, v3.y, v3.z, w);
    }
    
    static clamp(v, vMin, vMax) {
        let res = vec4.copy(v);
        if(res.x > vMax) res.x = vMax; else if(res.x < vMin) res.x = vMin;
        if(res.y > vMax) res.y = vMax; else if(res.y < vMin) res.y = vMin;
        if(res.z > vMax) res.z = vMax; else if(res.z < vMin) res.z = vMin;
        if(res.w > vMax) res.w = vMax; else if(res.w < vMin) res.w = vMin;
        return res;
    }
    
    get r() {
        return this.x;
    }
    set r(val) {
        this.x = val;
    }
    get g() {
        return this.y;
    }
    set g(val) {
        this.y = val;
    }
    get b() {
        return this.z;
    }
    set b(val) {
        this.z = val;
    }
    get a() {
        return this.w;
    }
    set a(val) {
        this.w = val;
    }
    
    get xyz() {
        return vec3(this.x, this.y, this.z);
    }
    set xyz(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }
    get rgb() {
        return vec3(this.x, this.y, this.z);
    }
    set rgb(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }
    
    /**
     * Linear interpolation between two vectors.
     * @param   {vec4}   v1 
     * @param   {vec4}   v2 
     * @param   {number} t  
     * @returns {vec4} 
     */
    static lerp(v1, v2, t) {
        return new vec4( v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t, v1.z + (v2.z - v1.z) * t, v1.w + (v2.w - v1.w) * t );
    }
}