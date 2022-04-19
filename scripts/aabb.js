/*
AABB class
AABB -> Axis Aligned Bounding Box , it will be used for denoting particular area in rectangular shape 

Properties:
1) x -> x coordinate of center of aabb
2) y -> y coordinate of center of aabb
3) w -> width of aabb
4) h -> height of aabb
5) left -> x coordinate of leftmost point of aabb
6) right -> x coordinate of rightmost point of aabb
7) top -> y coordinate of topmost point of aabb
8) bottom -> y coordinate of bottommost point of aabb

Methods:
1) containtPoint(pt) -> return true if Point pt lies inside the aabb.
                              O(1) complexity
2) intersectsAABB(range) -> returns true if it is overlapping with AABB range.
                              O(1) complexity
3) getQuadrant(dir) -> returns AABB having boundary of one of the four quadrants of it. 
                       dir can be ne(north east), 
                                  nw(north west),
                                  se(south east),
                                  sw(south west).
                              O(1) complexity
*/

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

  getQuadrant(dir) {
    let w = this.w / 2,
      h = this.h / 2;
    if (dir == "ne") {
      return new AABB(this.x + w / 2, this.y - h / 2, w, h);
    } else if (dir == "nw") {
      return new AABB(this.x - w / 2, this.y - h / 2, w, h);
    } else if (dir == "se") {
      return new AABB(this.x + w / 2, this.y + h / 2, w, h);
    } else {
      //"sw"
      return new AABB(this.x - w / 2, this.y + h / 2, w, h);
    }
  }
}
