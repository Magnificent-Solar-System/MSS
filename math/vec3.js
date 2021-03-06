var vec2;
if(typeof Vector2 === 'undefined') {
    vec2 = require(global.dirname + '/math/vec2.js');
} else {
    vec2 = Vector2;
}

class Vector3 {
    /**
     * Constructs new vector.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /* Returns length of this vector. */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /* Returns square length of this vector. */
    get sqrlen() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    
    get xz() {
        return new vec2(this.x, this.z);
    }
    get xy() {
        return new vec2(this.x, this.y);
    }
    
    /**
     * Returns a copy of this vector.
     * @returns {Vector3} 
     */
    get copy() {
        return new Vector3(this.x, this.y, this.z);
    }
    /**
     * Copies values from another vector.
     * @param {Vector3} v3
     */
    set copy(v3) {
        this.x = v3.x;
        this.y = v3.y;
        this.z = v3.z;
    }
    /**
     * Inverts this vector.
     */
    inv() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    }
    /**
     * Normalizes this vector.
     */
    norm() {
        let k = 1.0 / this.length;
        this.x = this.x * k;
        this.y = this.y * k;
        this.z = this.z * k;
    }
    
    /**
     * Returns normalized (unit) vector.
     * @param   {Vector3}  v 
     * @returns {Vector3}
     */
    static norm(v) {
        let k = 1.0 / v.length;
        return new Vector3(v.x * k, v.y * k, v.z * k);
    } 
    /**
     * Returns inverted vector.
     * @param   {Vector3}  v
     * @returns {Vector3}
     */
    static inv(v) {
        return new Vector3(-v.x, -v.y, -v.z);
    }
    /**
     * Returns cross product of two vectors.
     * @param   {Vector3}   v1
     * @param   {Vector3}   v2
     * @returns {Vector3}
     */
    static cross(v1, v2) {
        return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
    /**
     * Returns dot product of two vectors.
     * @param   {Vector3}   v1 
     * @param   {Vector3}   v2 
     * @returns {Vector3} 
     */
    static dot(v1, v2) {
         return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    /**
     * Returns sum of two vectors.
     * @param   {Vector3}   v1 
     * @param   {Vector3}   v2 
     * @returns {Vector3} 
     */
    static add(v1, v2) {
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    /**
     * Returns subtraction of two vectors.
     * @param   {Vector3}   v1 
     * @param   {Vector3}   v2 
     * @returns {Vector3} 
     */
    static sub(v1, v2) {
        return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    /**
     * Returns vector multiplied by scalar.
     * @param   {Vector3}   v 
     * @param   {number} s 
     * @returns {Vector3} 
     */
    static mulvs(v, s) {
        return new Vector3(v.x * s, v.y * s, v.z * s);
    }
    /**
     * Returns vector divided by scalar.
     * @param   {Vector3}   v 
     * @param   {number} s 
     * @returns {Vector3} 
     */
    static divvs(v, s) {
        let is = 1 / s;
        return new Vector3(v.x * is, v.y * is, v.z * is);
    }
    /**
     * Returns vector with components of first vector, multiplied by corresponding components second vector.
     * @param   {Vector3}   v1 
     * @param   {Vector3}   v2 
     * @returns {Vector3} 
     */
    static mulvv(v1, v2) {
        return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }
    /**
     * Returns vector with components of first vector, divided by corresponding components second vector.
     * @param   {Vector3}   v1 
     * @param   {Vector3}   v2 
     * @returns {Vector3} 
     */
    static divvv(v1, v2) {
        return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }
    /**
     * Creates vector with components equal to scalar.
     * @param   {number} s
     * @returns {Vector3} 
     */
    static fromScalar(s) {
        return new Vector3(s, s, s);
    }
    /**
     * Returns zero vector.
     * @returns {Vector3}
     */
    static zero() {
        return new Vector3(0.0, 0.0, 0.0);
    }
    /**
     * Returns vector with X component equal to 1.0, Y and Z components equal to 0.0
     * @returns {Vector3}
     */
    static unitX() {
        return new Vector3(1.0, 0.0, 0.0);
    }
    /**
    * Returns vector with Y component equal to 1.0, X and Z components equal to 0.0
    * @returns {Vector3}
    */
    static unitY() {
        return new Vector3(0.0, 1.0, 0.0);
    }
    /**
    * Returns vector with Z component equal to 1.0, X and Y components equal to 0.0
    * @returns {Vector3}
    */
    static unitZ() {
        return new Vector3(0.0, 0.0, 1.0);
    }
     /**
     * Returns vector with X component equal to -1.0, Y and Z components equal to 0.0
     * @returns {Vector3}
     */
    static unitNX() {
        return new Vector3(-1.0, 0.0, 0.0);
    }
    /**
    * Returns vector with Y component equal to -1.0, X and Z components equal to 0.0
    * @returns {Vector3}
    */
    static unitNY() {
        return new Vector3(0.0, -1.0, 0.0);
    }
    /**
    * Returns vector with Z component equal to -1.0, X and Y components equal to 0.0
    * @returns {Vector3}
    */
    static unitNZ() {
        return new Vector3(0.0, 0.0, -1.0);
    }
    
    /**
     * Linear interpolation between two vectors.
     * @param   {Vector3}   v1 
     * @param   {Vector3}   v2 
     * @param   {number} t  
     * @returns {Vector3} 
     */
    static lerp(v1, v2, t) {
        return new Vector3( v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t, v1.z + (v2.z - v1.z) * t);
    }
    
    /**
     * Clamps vector.
     * @param   {Vector3} v    
     * @param   {Vector3} vMin Minimum values.
     * @param   {Vector3} vMax Maximum values.
     * @returns {Vector3} 
     */
    static Clamp(v, vMin, vMax) {
        let res = v.copy();
        if(res.x > vMax.x) res.x = vMax.x; else if(res.x < vMin.x) res.x = vMin.x;
        if(res.y > vMax.y) res.y = vMax.y; else if(res.y < vMin.y) res.y = vMin.y;
        if(res.z > vMax.z) res.z = vMax.z; else if(res.z < vMin.z) res.z = vMin.z;
        return res;
    }
}
if(typeof module !== 'undefined') module.exports = Vector3;