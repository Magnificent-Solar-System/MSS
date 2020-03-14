class Quaternion {
    /**
     * Constructs new quaternion.
     * @param {number} s Scalar part
     * @param {number} x Vector part X
     * @param {number} y Vector part Y
     * @param {number} z Vector part Z                      
     */
    constructor(s, x, y, z) {
        this.s = s;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    get norm() {
        return Math.sqrt(this.s * this.s + this.x * this.x + this.y * this.y + this.z * this.z);
    }
    
    get sqrnorm() {
        return this.s * this.s + this.x * this.x + this.y * this.y + this.z * this.z;
    }
    get vector() {
        return new vec3(this.x, this.y, this.z);
    }
    set vector(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }
    
    /**
     * Normalizes this quaternion.
     */
    normalize() {
        let invNorm = 1 / Math.sqrt(this.s * this.s + this.x * this.x + this.y * this.y + this.z * this.z);
        this.s = this.s * invNorm;
        this.x = this.x * invNorm;
        this.y = this.y * invNorm;
        this.z = this.z * invNorm;
    }
    /**
     * Inverses this quaternion.
     */
    inverse() {
        let invSqrNorm = 1 / (this.s * this.s + this.x * this.x + this.y * this.y + this.z * this.z); 
        this.s = this.s * invSqrNorm;
        invSqrNorm = -invSqrNorm;
        this.x = this.x * invSqrNorm;
        this.y = this.y * invSqrNorm;
        this.z = this.z * invSqrNorm;
    }
    
    
    toMatrix(m) {
        let x2 = this.x * this.x;
		let y2 = this.y * this.y;
		let z2 = this.z * this.z;
		let xy = this.x * this.y;
		let xz = this.x * this.z;
		let yz = this.y * this.z;
		let sx = this.s * this.x;
		let sy = this.s * this.y;
		let sz = this.s * this.z;
        
        m.m[0] = 1.0 - 2.0 * (y2 + z2);
		m.m[4] = 2.0 * (xy - sz);
		m.m[8] = 2.0 * (xz + sy);
		m.m[12] = 0.0;

        m.m[1] = 2.0 * (xy + sz);
		m.m[5] = 1.0 - 2.0 * (x2 + z2);
		m.m[9] = 2.0 * (yz - sx);
		m.m[13] = 0.0;

		m.m[2] = 2.0 * (xz - sy);
		m.m[6] = 2.0 * (yz + sx);
		m.m[10] = 1.0 - 2.0 * (x2 + y2);
		m.m[14] = 0.0;

		m.m[3] = 0.0;
		m.m[7] = 0.0;
		m.m[11] = 0.0;
		m.m[15] = 1.0;
    }
    
    /**
     * Transforms vector.
     * @param {vec3} v
     */
    transform(v) {
        return Quaternion.Multiply(Quaternion.MultiplyByVector(this, v), Quaternion.Reciprocal(this)).vector;
    }
    
    /**
     * Returns multiplication of two quaternions.
     * @param   {Quaternion}   q1
     * @param   {Quaternion}   q2
     * @returns {Quaternion}
     */
    static Multiply(q1, q2) {
        return new Quaternion(
            q1.s * q2.s - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z, 
            q1.s * q2.x + q2.s * q1.x + q1.y * q2.z - q1.z * q2.y,
            q1.s * q2.y + q2.s * q1.y + q1.z * q2.x - q1.x * q2.z,
            q1.s * q2.z + q2.s * q1.z + q1.x * q2.y - q1.y * q2.x
        );
    }
    /**
     * Returns multiplication of quaternion and pure quaternion from vector.
     * @param   {Quaternion}   q
     * @param   {vec3}   v
     * @returns {Quaternion}
     */
    static MultiplyByVector(q, v) {
        return new Quaternion(
            - q.x * v.x - q.y * v.y - q.z * v.z, 
            q.s * v.x + q.y * v.z - q.z * v.y,
            q.s * v.y + q.z * v.x - q.x * v.z,
            q.s * v.z + q.x * v.y - q.y * v.x
        );
    }
    /**
     * Returns sum of two quaternions.
     * @param   {Quaternion} q1
     * @param   {Quaternion} q2
     * @returns {Quaternion}
     */
    static Add(q1, q2) {
        return new Quaternion(q1.s + q2.s, q1.x + q2.x, q1.y + q2.y, q1.z + q2.z);
    }
    /**
     * Returns subtraction of two quaternions.
     * @param   {Quaternion} q1 
     * @param   {Quaternion} q2 
     * @returns {Quaternion} 
     */
    static Sub(q1, q2) {
        return new Quaternion(q1.s - q2.s, q1.x - q2.x, q1.y - q2.y, q1.z - q2.z);
    }
    /**
     * Returns Quaternion multiplied by scalar.
     * @param   {Quaternion}  q
     * @param   {number}      s
     * @returns {Quaternion}
     */
    static MultiplyByScalar(q, s) {
        return new Quaternion(q.s * s, q.x * s, q.y * s, q.z * s);
    }
    /**
     * Returns Quaternion multiplied by scalar.
     * @param   {Quaternion}  q
     * @param   {number}      s
     * @returns {Quaternion}
     */
    static DivideByScalar(q, s) {
        let is = 1 / s;
        return new Quaternion(q.s * is, q.x * is, q.y * is, q.z * is);
    }
    
    /**
     * Returns conjugate of the quaternion.
     * @param   {Quaternion} q
     * @returns {Quaternion}
     */
    static Conjugate(q) {
        return new Quaternion(q.s, -q.x, -q.y, -q.z);
    }
    /**
     * Returns normalized (unit) quaternion.
     * @param   {Quaternion} q
     * @returns {Quaternion} 
     */
    static Normalize(q) {
        return Quaternion.DivideByScalar(q, q.norm);
    }
    /**
     * Returns reciprocal of the quaternion.
     * @param   {Quaternion}   q
     * @returns {Quaternion}
     */
    static Reciprocal(q) {
        return Quaternion.DivideByScalar(Quaternion.Conjugate(q), q.sqrnorm);
    }
    
    /**
     * Returns dot product of two quaternions.
     * @param   {Quaternion}   q1 
     * @param   {Quaternion}   q2 
     * @returns {number} 
     */
    static Dot(q1, q2) {
        return q1.s * q2.s + q1.x * q2.x + q1.y * q2.y + q1.z * q2.z;
    }
    
    /**
     * Returns identity quaternion.
     * @returns {Quaternion}
     */
    static Identity() {
        return new Quaternion(1.0, 0.0, 0.0, 0.0);
    }
    
    /**
     * Creates new quaternion from axis and angle.
     * @param   {vec3}   axis 
     * @param   {number} angle
     * @returns {Quaternion}
     */
    static FromAxisAngle(axis, angle) {
        let halfAngle = angle * 0.5;
        let sinA = Math.sin(halfAngle);
        let cosA = Math.cos(halfAngle);
        return new Quaternion(cosA, axis.x * sinA, axis.y * sinA, axis.z * sinA);
    }
    
    static FromYawPitchRoll(yaw, pitch, roll) 
    {
        let hRoll = roll * 0.5; 
        let hYaw = yaw * 0.5;
        let hPitch = pitch * 0.5;
        let sinhR = Math.sin(hRoll);
        let coshR = Math.cos(hRoll);
        let sinhP = Math.sin(hPitch);
        let coshP = Math.cos(hPitch);
        let sinhY = Math.sin(hYaw);
        let coshY = Math.cos(hYaw);

        return new Quaternion(
            ((coshY * coshP) * coshR) + ((sinhY * sinhP) * sinhR),
            ((coshY * sinhP) * coshR) + ((sinhY * coshP) * sinhR),
            ((sinhY * coshP) * coshR) - ((coshY * sinhP) * sinhR),
            ((coshY * coshP) * sinhR) - ((sinhY * sinhP) * coshR)
        );
    }
}