class vec3 {
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
     * @param   {vec3}  v 
     * @returns {vec3}
     */
    static norm(v) {
        let k = 1.0 / v.length;
        return new vec3(v.x * k, v.y * k, v.z * k);
    } 
    /**
     * Returns inverted vector.
     * @param   {vec3}  v
     * @returns {vec3}
     */
    static inv(v) {
        return new vec3(-v.x, -v.y, -v.z);
    }
    /**
     * Returns cross product of two vectors.
     * @param   {vec3}   v1
     * @param   {vec3}   v2
     * @returns {vec3}
     */
    static cross(v1, v2) {
        return new vec3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
    /**
     * Returns dot product of two vectors.
     * @param   {vec3}   v1 
     * @param   {vec3}   v2 
     * @returns {vec3} 
     */
    static dot(v1, v2) {
         return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    /**
     * Returns sum of two vectors.
     * @param   {vec3}   v1 
     * @param   {vec3}   v2 
     * @returns {vec3} 
     */
    static add(v1, v2) {
        return new vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    /**
     * Returns subtraction of two vectors.
     * @param   {vec3}   v1 
     * @param   {vec3}   v2 
     * @returns {vec3} 
     */
    static sub(v1, v2) {
        return new vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    /**
     * Returns vector multiplied by scalar.
     * @param   {vec3}   v 
     * @param   {number} s 
     * @returns {vec3} 
     */
    static mulvs(v, s) {
        return new vec3(v.x * s, v.y * s, v.z * s);
    }
    /**
     * Returns vector divided by scalar.
     * @param   {vec3}   v 
     * @param   {number} s 
     * @returns {vec3} 
     */
    static divvs(v, s) {
        let is = 1 / s;
        return new vec3(v.x / is, v.y * is, v.z * is);
    }
    /**
     * Returns vector with components of first vector, multiplied by corresponding components second vector.
     * @param   {vec3}   v1 
     * @param   {vec3}   v2 
     * @returns {vec3} 
     */
    static mulvv(v1, v2) {
        return new vec3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }
    /**
     * Returns vector with components of first vector, divided by corresponding components second vector.
     * @param   {vec3}   v1 
     * @param   {vec3}   v2 
     * @returns {vec3} 
     */
    static divvv(v1, v2) {
        return new vec3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }
    /**
     * Creates vector with components equal to scalar.
     * @param   {number} s
     * @returns {vec3} 
     */
    static fromScalar(s) {
        return new vec3(s, s, s);
    }
    /**
     * Returns zero vector.
     * @returns {vec3}
     */
    static zero() {
        return new vec3(0.0, 0.0, 0.0);
    }
    /**
     * Returns vector with X component equal to 1.0, Y and Z components equal to 0.0
     * @returns {vec3}
     */
    static unitX() {
        return new vec3(1.0, 0.0, 0.0);
    }
    /**
    * Returns vector with Y component equal to 1.0, X and Z components equal to 0.0
    * @returns {vec3}
    */
    static unitY() {
        return new vec3(0.0, 1.0, 0.0);
    }
    /**
    * Returns vector with Z component equal to 1.0, X and Y components equal to 0.0
    * @returns {vec3}
    */
    static unitZ() {
        return new vec3(0.0, 0.0, 1.0);
    }
} 