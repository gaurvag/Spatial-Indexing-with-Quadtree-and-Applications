// Axis Aligned Bounding Box
class AABB {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.left = x - w / 2;
    this.right = x + w / 2;
    this.top = y - h / 2;
    this.bottom = y + h / 2;
  }
  getQuadrant(dir) {
    let w = this.w / 2,
      h = this.h / 2;
    if (dir == "ne") {
      return new AABB(this.x + w / 2, this.y - h / 2, w, h);
    } else if (dir == "nw") {
      return new AABB(this.x - w / 2, this.y - h / 2, w, h);
    } else if (dir == "se") {
      return new AABB(this.x + w / 2, this.y + h / 2, w, h);
    } else {  //"sw"
      return new AABB(this.x - w / 2, this.y + h / 2, w, h);
    }
  }
  containsPoint(point) {
    if (point.x > this.right || point.x < this.left) {
      return false;
    }
    if (point.y > this.bottom || point.y < this.top) {
      return false;
    }
    return true;
  }
  intersectsAABB(range) {
    //horizontally common length
    var horz =
      Math.min(this.right, range.right) - Math.max(this.left, range.left);
    if (horz < 0) {
      return false;
    }
    //vertically common length
    var vert =
      Math.min(this.bottom, range.bottom) - Math.max(this.top, range.top);
    if (vert < 0) {
      return false;
    }
    return true;
  }
}
