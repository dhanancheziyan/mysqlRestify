var PI = Math.PI;
exports.PI1 = PI;

var a={};
a.P2 = "KDJD";
exports.a = a;
exports.area = function (r) {
  return PI * r * r;
};

exports.circumference = function (r) {
  return 2 * PI * r;
};