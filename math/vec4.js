class vec4 {
    /**
     * Constructs new vector.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    /* Returns length of this vector. */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    /* Returns square length of this vector. */
    get sqrlen() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    
    set xyz(v3) {
        this.x = v3.x;
        this.y = v3.y;
        this.z = v3.z;
    }
    
    /**
     * Returns a copy of this vector.
     * @returns {vec3} 
     */
    copy() {
        return new vec4(this.x, this.y, this.z, this.w);
    }
    /**
     * Inverts this vector.
     */
    inv() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
    }
    /**
     * Normalizes this vector.
     */
    norm() {
        let k = 1.0 / this.length;
        this.x = this.x * k;
        this.y = this.y * k;
        this.z = this.z * k;
        this.w = this.w * k;
    }
    
    /**
     * Returns normalized (unit) vector.
     * @param   {vec4}  v 
     * @returns {vec4}
     */
    static norm(v) {
        let k = 1.0 / v.length;
        return new vec4(v.x * k, v.y * k, v.z * k, v.w * k);
    } 
    /**
     * Returns inverted vector.
     * @param   {vec4}  v
     * @returns {vec4}
     */
    static inv(v) {
        return new vec4(-v.x, -v.y, -v.z, -v.w);
    }
    /**
     * Returns dot product of two vectors.
     * @param   {vec4}   v1 
     * @param   {vec4}   v2 
     * @returns {vec4} 
     */
    static dot(v1, v2) {
         return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
    }
    /**
     * Returns sum of two vectors.
     * @param   {vec4}   v1 
     * @param   {vec4}   v2 
     * @returns {vec4} 
     */
    static add(v1, v2) {
        return new vec4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
    }
    /**
     * Returns subtraction of two vectors.
     * @param   {vec4}   v1 
     * @param   {vec4}   v2 
     * @returns {vec4} 
     */
    static sub(v1, v2) {
        return new vec4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
    }
    /**
     * Returns vector multiplied by scalar.
     * @param   {vec4}   v 
     * @param   {number} s 
     * @returns {vec4} 
     */
    static mulvs(v, s) {
        return new vec4(v.x * s, v.y * s, v.z * s, v.w * s);
    }
    /**
     * Returns vector divided by scalar.
     * @param   {vec4}   v 
     * @param   {number} s 
     * @returns {vec4} 
     */
    static divvs(v, s) {
        let is = 1 / s;
        return new vec4(v.x * is, v.y * is, v.z * is, v.w * is);
    }
    /**
     * Returns vector with components of first vector, multiplied by corresponding components second vector.
     * @param   {vec4}   v1 
     * @param   {vec4}   v2 
     * @returns {vec4} 
     */
    static mulvv(v1, v2) {
        return new vec4(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w);
    }
    /**
     * Returns vector with components of first vector, divided by corresponding components second vector.
     * @param   {vec4}   v1 
     * @param   {vec4}   v2 
     * @returns {vec4} 
     */
    static divvv(v1, v2) {
        return new vec4(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }
    /**
     * Creates vector with components equal to scalar.
     * @param   {number} s
     * @returns {vec4} 
     */
    static fromScalar(s) {
        return new vec4(s, s, s, s);
    }
    /**
     * Returns zero vector.
     * @returns {vec4}
     */
    static zero() {
        return new vec4(0.0, 0.0, 0.0, 0.0);
    }
    /**
     * Returns vector with X component equal to 1.0, Y, Z and W components equal to 0.0
     * @returns {vec4}
     */
    static unitX() {
        return new vec4(1.0, 0.0, 0.0, 0.0);
    }
    /**
    * Returns vector with Y component equal to 1.0, X, Z and W components equal to 0.0
    * @returns {vec4}
    */
    static unitY() {
        return new vec4(0.0, 1.0, 0.0, 0.0);
    }
    /**
    * Returns vector with Z component equal to 1.0, X, Y and W components equal to 0.0
    * @returns {vec4}
    */
    static unitZ() {
        return new vec4(0.0, 0.0, 1.0, 0.0);
    }
    /**
    * Returns vector with Z component equal to 1.0, X, Y and Z components equal to 0.0
    * @returns {vec4}
    */
    static unitW() {
        return new vec4(0.0, 0.0, 0.0, 1.0);
    }
    
    /**
     * Linear interpolation between two vectors.
     * @param   {vec4}   v1 
     * @param   {vec4}   v2 
     * @param   {number} t  
     * @returns {vec4} 
     */
    static lerp(v1, v2, t) {
        return new vec4( v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t, v1.z + (v2.z - v1.z) * t, v1.w + (v2.w - v1.w));
    }
    
    /**
     * Clamps vector.
     * @param   {vec4} v    
     * @param   {vec4} vMin Minimum values.
     * @param   {vec4} vMax Maximum values.
     * @returns {vec4} 
     */
    static Clamp(v, vMin, vMax) {
        let res = v.copy();
        if(res.x > vMax.x) res.x = vMax.x; else if(res.x < vMin.x) res.x = vMin.x;
        if(res.y > vMax.y) res.y = vMax.y; else if(res.y < vMin.y) res.y = vMin.y;
        if(res.z > vMax.z) res.z = vMax.z; else if(res.z < vMin.z) res.z = vMin.z;
        if(res.w > vMax.w) res.w = vMax.w; else if(res.w < vMin.w) res.w = vMin.w;
        return res;
    }
}