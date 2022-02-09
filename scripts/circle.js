// circle class for a circle shaped query
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  containsPoint(pt) {
    var xdist = this.x - pt.x;
    var ydist = this.y - pt.y;
    return Math.pow(xdist, 2) + Math.pow(ydist, 2) <= Math.pow(this.r, 2);
  }

  intersectsAABB(range) {
    var xn = Math.max(range.left, Math.min(range.right, this.x));
    var yn = Math.max(range.top, Math.min(range.bottom, this.y));
    var pt = new Point(xn, yn);
    return this.containsPoint(pt);
  }
}
