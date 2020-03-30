const DoublePI = 2 * Math.PI;
function default_arg(arg, defaultValue) {
    return arg === undefined ? defaultValue : arg;
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function log_if(cond, msg) {
    if(cond) {
        console.log(msg);
    }
}
function rgb2luma(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
}