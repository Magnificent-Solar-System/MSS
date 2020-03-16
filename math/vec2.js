class vec2 {
    /**
     * Constructs new vector.
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /* Returns length of this vector. */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /* Returns square length of this vector. */
    get sqrlen() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * Returns a copy of this vector.
     * @returns {vec2} 
     */
    get copy() {
        return new vec2(this.x, this.y);
    }
    /**
     * Copies values from another vector.
     * @param {vec2} v2
     */
    set copy(v2) {
        this.x = v2.x;
        this.y = v2.y;
    }
    /**
     * Inverts this vector.
     */
    inv() {
        this.x = -this.x;
        this.y = -this.y;
    }
    /**
     * Normalizes this vector.
     */
    norm() {
        let k = 1.0 / this.length;
        this.x = this.x * k;
        this.y = this.y * k;
    }
    
    /**
     * Returns normalized (unit) vector.
     * @param   {vec2}  v 
     * @returns {vec2}
     */
    static norm(v) {
        let k = 1.0 / v.length;
        return new vec2(v.x * k, v.y * k);
    } 
    /**
     * Returns inverted vector.
     * @param   {vec2}  v
     * @returns {vec2}
     */
    static inv(v) {
        return new vec2(-v.x, -v.y);
    }
    /**
     * Returns dot product of two vectors.
     * @param   {vec2}   v1 
     * @param   {vec2}   v2 
     * @returns {vec2} 
     */
    static dot(v1, v2) {
         return v1.x * v2.x + v1.y * v2.y;
    }
    /**
     * Returns sum of two vectors.
     * @param   {vec2}   v1 
     * @param   {vec2}   v2 
     * @returns {vec2} 
     */
    static add(v1, v2) {
        return new vec2(v1.x + v2.x, v1.y + v2.y);
    }
    /**
     * Returns subtraction of two vectors.
     * @param   {vec2}   v1 
     * @param   {vec2}   v2 
     * @returns {vec2} 
     */
    static sub(v1, v2) {
        return new vec2(v1.x - v2.x, v1.y - v2.y);
    }
    /**
     * Returns vector multiplied by scalar.
     * @param   {vec2}   v 
     * @param   {number} s 
     * @returns {vec2} 
     */
    static mulvs(v, s) {
        return new vec2(v.x * s, v.y * s);
    }
    /**
     * Returns vector divided by scalar.
     * @param   {vec2}   v 
     * @param   {number} s 
     * @returns {vec2} 
     */
    static divvs(v, s) {
        let is = 1 / s;
        return new vec2(v.x * is, v.y * is);
    }
    /**
     * Returns vector with components of first vector, multiplied by corresponding components second vector.
     * @param   {vec2}   v1 
     * @param   {vec2}   v2 
     * @returns {vec2} 
     */
    static mulvv(v1, v2) {
        return new vec2(v1.x * v2.x, v1.y * v2.y);
    }
    /**
     * Returns vector with components of first vector, divided by corresponding components second vector.
     * @param   {vec2}   v1 
     * @param   {vec2}   v2 
     * @returns {vec2} 
     */
    static divvv(v1, v2) {
        return new vec2(v1.x / v2.x, v1.y / v2.y);
    }
    /**
     * Creates vector with components equal to scalar.
     * @param   {number} s
     * @returns {vec2} 
     */
    static fromScalar(s) {
        return new vec2(s, s);
    }
    /**
     * Returns zero vector.
     * @returns {vec2}
     */
    static zero() {
        return new vec2(0.0, 0.0);
    }
    /**
     * Returns vector with X component equal to 1.0, Y component equal to 0.0
     * @returns {vec2}
     */
    static unitX() {
        return new vec2(1.0, 0.0);
    }
    /**
    * Returns vector with Y component equal to 1.0, X component equal to 0.0
    * @returns {vec2}
    */
    static unitY() {
        return new vec2(0.0, 1.0);
    }
    
    /**
     * Linear interpolation between two vectors.
     * @param   {vec2}   v1 
     * @param   {vec2}   v2 
     * @param   {number} t  
     * @returns {vec2} 
     */
    static lerp(v1, v2, t) {
        return new vec2( v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t );
    }
    
    /**
     * Clamps vector.
     * @param   {vec2} v    
     * @param   {vec2} vMin Minimum values.
     * @param   {vec2} vMax Maximum values.
     * @returns {vec2} 
     */
    static Clamp(v, vMin, vMax) {
        let res = v.copy();
        if(res.x > vMax.x) res.x = vMax.x; else if(res.x < vMin.x) res.x = vMin.x;
        if(res.y > vMax.y) res.y = vMax.y; else if(res.y < vMin.y) res.y = vMin.y;
        return res;
    }
} 