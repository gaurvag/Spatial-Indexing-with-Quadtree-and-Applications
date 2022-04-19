/*
Point class

Properties:
1) x -> x coordinate of point
2) y -> y coordinate of point
3) type -> type of object this point denotes
4) data -> data stored by this point

Methods:
1) isEqual(pt) -> return true if it is equal to Point pt.
                  O(1) complexity
2) sqDist(pt) -> return square of distance from Point pt.
                  O(1) complexity

*/

class Point {
  constructor(x, y, type, data) {
    this.x = x;
    this.y = y;
    this.type = type;  
    this.data = data;
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
