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
     * Returns a copy of this quaternion.
     * @returns {Quaternion} 
     */
    copy() {
        return new Quaternion(this.s, this.x, this.y, this.z);
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
     * Inverses this quaternion. (reciprocal)
     */
    inverse() {
        let invSqrNorm = 1 / (this.s * this.s + this.x * this.x + this.y * this.y + this.z * this.z); 
        this.s = this.s * invSqrNorm;
        invSqrNorm = -invSqrNorm;
        this.x = this.x * invSqrNorm;
        this.y = this.y * invSqrNorm;
        this.z = this.z * invSqrNorm;
    }
    
    /**
     * Negates all components of this quaternion.
     */
    negate() {
        this.s = -this.s;
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    }
    
    /**
     * Returns a copy of this quaternion without the scalar part.
     * @returns {Quaternion} Pure quaternion.
     */
    pure() {
        return new Quaternion(0, this.x, this.y, this.z);
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
    
    /**
     * Creates rotation quaternion from yaw, pitch and roll.
     * @param   {number} yaw   
     * @param   {number} pitch 
     * @param   {number} roll  
     * @returns {Quaternion} 
     */
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
    
    /**
     * Linear interpolation between two quaternions. 
     * Uses normalized arguments. 
     * Normalizes result.
     * @param   {Quaternion} pq1 
     * @param   {Quaternion} pq2 
     * @param   {number} t  
     * @returns {Quaternion} 
     */
    static Lerp(pq1, pq2, t) {
        let q1 = Quaternion.Normalize(pq1);
        let q2 = Quaternion.Normalize(pq2);
        return Quaternion.Normalize(Quaternion.Add(q1, Quaternion.MultiplyByScalar(Quaternion.Sub(q2, q1), t)));
    }
    
    /**
     * Linear interpolation between two quaternions. 
     * Expects normalized quaternions (uses not normalized arguments). 
     * Normalizes result.
     * @param   {Quaternion} q1 
     * @param   {Quaternion} q2 
     * @param   {number} t  
     * @returns {Quaternion} 
     */
    static LerpN(q1, q2, t) {
        return Quaternion.Normalize(Quaternion.Add(q1, Quaternion.MultiplyByScalar(Quaternion.Sub(q2, q1), t)));
    }
    
    /**
     * Spherical linear interpolation between two quaternions.
     * Uses normalized arguments.
     * @param {Quaternion} pq1 
     * @param {Quaternion} pq2 
     * @param {number} t  
     * @returns {Quaternion} Normalized result. 
     */
    static Slerp(pq1, pq2, t) {
        let q1 = Quaternion.Normalize(pq1);
        let q2 = Quaternion.Normalize(pq2);
        
        let dot = Quaternion.Dot(q1, q2);
        if(dot < 0.0) {
            //Always choose the shortest path
            dot = -dot;
            q2.negate();
        }
        const dot_max = 0.9995;
        if(dot > dot_max) {
            //If quaternions are too close -> lerp
            return Quaternion.Normalize(Quaternion.Add(q1, Quaternion.MultiplyByScalar(Quaternion.Sub(q2, q1), t)));
        }
        
        let theta = Math.acos(dot);
        let thetaT = theta0 * t;
        
        let s2 =  Math.sin(thetaT) / Math.sin(theta);
        
        // sin(a - b) = sin a cos b - sin b cos a
        
        // sin( (1 - t)theta ) = sin( theta - thetaT ) =
        // = sin (theta) * cos(thetaT) - sin (thetaT) * cos(theta)
        
        //s1 = sin( (1 - t)theta ) / sin( theta ) =
        // = cos(thetaT) - sin (thetaT) * cos(theta) / sin(theta) =
        // = cos(thetaT) - s2 * dot;
        
        let s1 = Math.cos(thetaT) - dot * s2; 

        //Q = Q1 * s1 + Q2 * s2
        return Quaternion.Add(Quaternion.MultiplyByScalar(q1, s1),  Quaternion.MultiplyByScalar(q2, s2));
    }
    /**
     * Spherical linear interpolation between two quaternions.
     * Expects normalized arguments.
     * Normalizes result.
     * @param {Quaternion} q1 
     * @param {Quaternion} q2 
     * @param {number} t  
     * @returns {Quaternion} Normalized result. 
     */
    static SlerpN(q1, q2, t) {
        let dot = Quaternion.Dot(q1, q2);
        if(dot < 0.0) {
            dot = -dot;
            q2.negate();
        }
        const dot_max = 0.9995;
        if(dot > dot_max) {
            return Quaternion.Normalize(Quaternion.Add(q1, Quaternion.MultiplyByScalar(Quaternion.Sub(q2, q1), t)));
        }
        let theta = Math.acos(dot);
        let thetaT = theta0 * t;
        
        let s2 =  Math.sin(thetaT) / Math.sin(theta);
        let s1 = Math.cos(thetaT) - dot * s2; 

        return Quaternion.Add(Quaternion.MultiplyByScalar(q1, s1),  Quaternion.MultiplyByScalar(q2, s2));
    }
    /**
     * Returns the exponential of the quaternion. 
     * q = [a, v]; theta = |v|; exp(q) = exp(a) * (cos(theta)  + sin(theta) / theta * v)
     * @param   {Quaternion} q
     * @returns {Quaternion}
     */
    static Exp(q) {
        let len = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z);
        let expS = Math.exp(q.s);
        let k = expS * Math.sin(len) / len;
        return new Quaternion(
            expS * Math.cos(len), 
            q.x * k, q.y * k, q.z * k);
    }
     /**
     * Returns the exponential of the quaternion.
     * Expects quaternion with scalar part equal to 0.
     * q = [a, v]; theta = |v|; exp(q) = cos(theta)  + sin(theta) / theta * v
     * @param   {Quaternion} q
     * @returns {Quaternion}
     */
    static ExpN(q) {
        let len = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z);
        let k = Math.sin(len) / len;
        return new Quaternion(
            Math.cos(len), 
            q.x * k, q.y * k, q.z * k
        );
    }
    
    /**
     * Returns logarithm of the quaternion.
     * @param   {Quaternion}   q 
     * @returns {Quaternion}
     */
    static Log(q) {
        let l = q.x * q.x + q.y * q.y + q.z * q.z;
        let n = Math.sqrt(l + q.s * q.s); // |q|
        l = Math.sqrt(l);
        n = 1.0 / l * Math.acos(q.s / n); // 1 / |q.v| * acos(q.s / |q|) 
        return new Quaternion(
            Math.log(n),
            q.x * n, q.y * n, q.z * n
        );
    }
    
    static LogN(q) {
        let k = Math.sin(Math.acos(q.s));
        return new Quaternion(0, k * q.x, k * q.y, k * q.z );
    }
    
    static Squad(q1, q2, s1, s2, t) {
        return Quaternion.Slerp(Quaternion.Slerp(q1, q2, t), Quaternion.Slerp(s1, s2, t), 2 * t * (1 - t));
    }
    
    static SquadN(q1, q2, s1, s2, t) {
        return Quaternion.SlerpN(Quaternion.SlerpN(q1, q2, t), Quaternion.SlerpN(s1, s2, t), 2 * t * (1 - t));
    }
}