var vec3;
if(typeof Vector2 === 'undefined') {
    vec3 = require(global.dirname + '/math/vec3.js');
} else {
    vec3 = Vector3;
}

class Matrix4 {
    constructor () {
        this.m = new Float32Array(16);
    }
    
    /* makes this matrix identity */
    identity() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 0;
        
        this.m[4] = 0;
        this.m[5] = 1;
        this.m[6] = 0;
        this.m[7] = 0;
        
        this.m[8] = 0;
        this.m[9] = 0;
        this.m[10] = 1;
        this.m[11] = 0;
        
        this.m[12] = 0;
        this.m[13] = 0;
        this.m[14] = 0;
        this.m[15] = 1;
    }   
    
    get translation() {
        return new vec3(this.m[12], this.m[13], this.m[14]);
    }
    set translation(v) {
        this.m[12] = v.x;
        this.m[13] = v.y;
        this.m[14] = v.z;
    }
    get scale() {
        return new vec3(this.m[0], this.m[5], this.m[10]);
    }
    get right() {
        return new vec3(this.m[0], this.m[4], this.m[8]);
    }
    get left() {
        return new vec3(-this.m[0], -this.m[4], -this.m[8]);
    }
    get up() {
        return new vec3(this.m[1], this.m[5], this.m[9]);
    }
    get down() {
        return new vec3(-this.m[1], -this.m[5], -this.m[9]);
    }
    get forward() {
        return new vec3(-this.m[2], -this.m[6], -this.m[10]);
    }
    get backward() {
        return new vec3(this.m[2], this.m[6], this.m[10]);
    }
    set right(val) {
        this.m[0] = val.x;
        this.m[4] = val.y;
        this.m[8] = val.z;
    }
    set left(val) {
        this.m[0] = -val.x;
        this.m[4] = -val.y;
        this.m[8] = -val.z;
    }
    set up(val) {
        this.m[1] = val.x;
        this.m[5] = val.y;
        this.m[9] = val.z;
    }
    set down(val) {
        this.m[1] = -val.x;
        this.m[5] = -val.y;
        this.m[9] = -val.z;
    }
    set forward(val) {
        this.m[2] = -val.x;
        this.m[6] = -val.y;
        this.m[10] = -val.z;
    }
    set backward(val) {
        this.m[2] = val.x;
        this.m[6] = val.y;
        this.m[10] = val.z;
    }
    
    translate(v) {
        this.m[12] += v.x;
        this.m[13] += v.y;
        this.m[14] += v.z;
    }
    scale(v) {
        this.m[0] *= v.x;
        this.m[5] *= v.y;
        this.m[10] *= v.z;
    }
    
    /* multiplies vector on matrix (vec with w = 1 (point)) */
    transform(v) {
        let resX = v.x * this.m[0] + v.y * this.m[4] + v.z * this.m[8] + /*w * */ this.m[12];
        let resY = v.x * this.m[1] + v.y * this.m[5] + v.z * this.m[9] + /*w * */ this.m[13];
        let resZ = v.x * this.m[2] + v.y * this.m[6] + v.z * this.m[10] + /*w * */ this.m[14];
        return new vec3(resX, resY, resZ);
    }
    /* multiplies vector on matrix (vec with w = 0 (direction)) */
    transformDirection(v) {
        let resX = v.x * this.m[0] + v.y * this.m[4] + v.z * this.m[8];
        let resY = v.x * this.m[1] + v.y * this.m[5] + v.z * this.m[9];
        let resZ = v.x * this.m[2] + v.y * this.m[6] + v.z * this.m[10];
        return new vec3(resX, resY, resZ);
    }
    
    copy(m) {
        this.m[0] = m.m[0];
        this.m[1] = m.m[1];
        this.m[2] = m.m[2];
        this.m[3] = m.m[3];
        this.m[4] = m.m[4];
        this.m[5] = m.m[5];
        this.m[6] = m.m[6];
        this.m[7] = m.m[7];
        this.m[8] = m.m[8];
        this.m[9] = m.m[9];
        this.m[10] = m.m[10];
        this.m[11] = m.m[11];
        this.m[12] = m.m[12];
        this.m[13] = m.m[13];
        this.m[14] = m.m[14];
        this.m[15] = m.m[15];
    }
    
    static World(m, scale, translation, rotation) {
        let tmp = new Matrix4();
        Matrix4.Multiply(tmp, scale, rotation);
        Matrix4.Multiply(m, tmp, translation);
    }
    
    static Identity(m) {
        m.m[0] = 1;
        m.m[1] = 0;
        m.m[2] = 0;
        m.m[3] = 0;
        
        m.m[4] = 0;
        m.m[5] = 1;
        m.m[6] = 0;
        m.m[7] = 0;
        
        m.m[8] = 0;
        m.m[9] = 0;
        m.m[10] = 1;
        m.m[11] = 0;
        
        m.m[12] = 0;
        m.m[13] = 0;
        m.m[14] = 0;
        m.m[15] = 1;
    }
    static Scale(m, v) {
        m.m[0] = v.x;
        m.m[1] = 0;
        m.m[2] = 0;
        m.m[3] = 0;
        
        m.m[4] = 0;
        m.m[5] = v.y;
        m.m[6] = 0;
        m.m[7] = 0;
        
        m.m[8] = 0;
        m.m[9] = 0;
        m.m[10] = v.z;
        m.m[11] = 0;
        
        m.m[12] = 0;
        m.m[13] = 0;
        m.m[14] = 0;
        m.m[15] = 1;
    }
    static Translation(m, v) {
        m.m[0] = 1;
        m.m[1] = 0;
        m.m[2] = 0;
        m.m[3] = 0;
        
        m.m[4] = 0;
        m.m[5] = 1;
        m.m[6] = 0;
        m.m[7] = 0;
        
        m.m[8] = 0;
        m.m[9] = 0;
        m.m[10] = 1;
        m.m[11] = 0;
        
        m.m[12] = v.x;
        m.m[13] = v.y;
        m.m[14] = v.z;
        m.m[15] = 1;
    }
    static RotationX(m, roll) {
        let sina = Math.sin(roll);
        let cosa = Math.cos(roll);
        m.m[0] = 1;
        m.m[1] = 0;
        m.m[2] = 0;
        m.m[3] = 0;
        m.m[4] = 0;
        m.m[5] = cosa;
        m.m[6] = sina;
        m.m[7] = 0;
        m.m[8] = 0;
        m.m[9] = -sina;
        m.m[10] = cosa;
        m.m[11] = 0;
        m.m[12] = 0;
        m.m[13] = 0;
        m.m[14] = 0;
        m.m[15] = 1;
        
    }
    static RotationY(m, pitch) {
        let sina = Math.sin(pitch);
        let cosa = Math.cos(pitch);
        m.m[0] = cosa;
        m.m[1] = 0;
        m.m[2] = -sina;
        m.m[3] = 0;
        m.m[4] = 0;
        m.m[5] = 1;
        m.m[6] = 0;
        m.m[7] = 0;
        m.m[8] = sina;
        m.m[9] = 0;
        m.m[10] = cosa;
        m.m[11] = 0;
        m.m[12] = 0;
        m.m[13] = 0;
        m.m[14] = 0;
        m.m[15] = 1;
    }
    static RotationZ(m, yaw) {
        let sina = Math.sin(yaw);
        let cosa = Math.cos(yaw);
        m.m[0] = cosa;
        m.m[1] = sina;
        m.m[2] = 0;
        m.m[3] = 0;
        m.m[4] = -sina;
        m.m[5] = cosa;
        m.m[6] = 0;
        m.m[7] = 0;
        m.m[8] = 0;
        m.m[9] = 0;
        m.m[10] = 1;
        m.m[11] = 0;
        m.m[12] = 0;
        m.m[13] = 0;
        m.m[14] = 0;
        m.m[15] = 1;
    }
    static Perspective(m, aspectRatio, zNear, zFar, fov) {
        let a = Math.tan(fov * 0.5);
        let b = 1.0 / (zFar - zNear);
        m.m[0] = 1.0 / (a * aspectRatio);
        m.m[1] = 0;
        m.m[2] = 0;
        m.m[3] = 0;
        m.m[4] = 0;
        m.m[5] = 1.0 / a;
        m.m[6] = 0;
        m.m[7] = 0;
        m.m[8] = 0;
        m.m[9] = 0;
        m.m[10] = -(zFar + zNear) * b;
        m.m[11] = -1.0;
        m.m[12] = 0;
        m.m[13] = 0;
        m.m[14] = -2*(zNear * zFar) * b;
        m.m[15] = 0;
        return m;  
    }
    static LookAt(m, eye, trg, up) {
        let nForward = vec3.norm(vec3.sub(eye, trg));
        let nRight = vec3.norm(vec3.cross(up, nForward));
        let nUp = vec3.cross(nForward, nRight);
        m.m[0] = nRight.x;
        m.m[1] = nUp.x;
        m.m[2] = nForward.x;
        m.m[3] = 0;
        m.m[4] = nRight.y;
        m.m[5] = nUp.y;
        m.m[6] = nForward.y;
        m.m[7] = 0;
        m.m[8] = nRight.z;
        m.m[9] = nUp.z;
        m.m[10] = nForward.z;
        m.m[11] = 0;
        m.m[12] = -vec3.dot(nRight, eye);
        m.m[13] = -vec3.dot(nUp, eye);
        m.m[14] = -vec3.dot(nForward, eye);
        m.m[15] = 1.0;
    }
    static Multiply(m, l, r) {
        m.m[0] = l.m[0] * r.m[0] + l.m[1] * r.m[4] + l.m[2] * r.m[8] + l.m[3] * r.m[12];
        m.m[1] = l.m[0] * r.m[1] + l.m[1] * r.m[5] + l.m[2] * r.m[9] + l.m[3] * r.m[13];
        m.m[2] = l.m[0] * r.m[2] + l.m[1] * r.m[6] + l.m[2] * r.m[10] + l.m[3] * r.m[14];
        m.m[3] = l.m[0] * r.m[3] + l.m[1] * r.m[7] + l.m[2] * r.m[11] + l.m[3] * r.m[15];
        m.m[4] = l.m[4] * r.m[0] + l.m[5] * r.m[4] + l.m[6] * r.m[8] + l.m[7] * r.m[12];
        m.m[5] = l.m[4] * r.m[1] + l.m[5] * r.m[5] + l.m[6] * r.m[9] + l.m[7] * r.m[13];
        m.m[6] = l.m[4] * r.m[2] + l.m[5] * r.m[6] + l.m[6] * r.m[10] + l.m[7] * r.m[14];
        m.m[7] = l.m[4] * r.m[3] + l.m[5] * r.m[7] + l.m[6] * r.m[11] + l.m[7] * r.m[15];
        m.m[8] = l.m[8] * r.m[0] + l.m[9] * r.m[4] + l.m[10] * r.m[8] + l.m[11] * r.m[12];
        m.m[9] = l.m[8] * r.m[1] + l.m[9] * r.m[5] + l.m[10] * r.m[9] + l.m[11] * r.m[13];
        m.m[10] = l.m[8] * r.m[2] + l.m[9] * r.m[6] + l.m[10] * r.m[10] + l.m[11] * r.m[14];
        m.m[11] = l.m[8] * r.m[3] + l.m[9] * r.m[7] + l.m[10] * r.m[11] + l.m[11] * r.m[15];
        m.m[12] = l.m[12] * r.m[0] + l.m[13] * r.m[4] + l.m[14] * r.m[8] + l.m[15] * r.m[12];
        m.m[13] = l.m[12] * r.m[1] + l.m[13] * r.m[5] + l.m[14] * r.m[9] + l.m[15] * r.m[13];
        m.m[14] = l.m[12] * r.m[2] + l.m[13] * r.m[6] + l.m[14] * r.m[10] + l.m[15] * r.m[14];
        m.m[15] = l.m[12] * r.m[3] + l.m[13] * r.m[7] + l.m[14] * r.m[11] + l.m[15] * r.m[15];
    }
}
if(typeof module !== 'undefined') module.exports = Matrix4;