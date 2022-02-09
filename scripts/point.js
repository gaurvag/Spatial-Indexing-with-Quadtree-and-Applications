class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  isEqual(pt) {
    return this.x == pt.x && this.y == pt.y;
  }
  sqDist(pt) {
    var xdist = this.x - pt.x;
    var ydist = this.y - pt.y;
    return Math.pow(xdist, 2) + Math.pow(ydist, 2);
  }
}
