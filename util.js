function lerp(a, b, t) {
    return a + (b - a) * t;
}
function log_if(cond, msg) {
    if(cond) {
        console.log(msg);
    }
}