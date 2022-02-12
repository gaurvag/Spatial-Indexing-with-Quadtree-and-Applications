/*
Quadtree class

Properties:
1) boundary -> AABB defining area Quadtree will be covering
2) points -> array of Points in the Quadtree 
3) divided -> true if the Quadtree is having 4 child Quadtree for each quadrant
4) nw -> north west quadrant of Quadtree as a Quadtree
5) ne -> north east quadrant of Quadtree as a Quadtree
6) sw -> south west quadrant of Quadtree as a Quadtree
7) se -> south east quadrant of Quadtree as a Quadtree

Methods:
1) subdivide() -> create 4 Quadtree having boundary of each of the 4 quadrants of Quadtree.
                                          O(1) complexity
2) insert(point) -> inserts Point point in the Quadtree
                                          log2(N) average complexity
3) search(point) -> return true if Point point exists in the Quadtree.
                                          log2(N) average complexity
4) query(range, found) -> return array of points which exist in Quadtree and lies in AABB range.
                                          log2(N) average complexity
5) kClosest(searchPoint, k, radar, pq) -> return array of atmax k Points which are closest to 
                                          Point searchPoint and lies in Circle Radar.   
                                          log2(N+k) average complexity 
N is max(boundary.w, boundary.h)
 
*/

//number of Points each node in Quadtree can hold
const QT_node_capacity = 2;

class QuadTree {
  constructor(boundary) {
    this.boundary = boundary;
    this.points = [];
    this.divided = false;
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
  }

  subdivide() {
    this.ne = new QuadTree(this.boundary.getQuadrant("ne"));
    this.nw = new QuadTree(this.boundary.getQuadrant("nw"));
    this.se = new QuadTree(this.boundary.getQuadrant("se"));
    this.sw = new QuadTree(this.boundary.getQuadrant("sw"));
    this.divided = true;
  }

  insert(point) {
    if (!this.boundary.containsPoint(point)) {
      return false;
    }
    if (this.points.length < QT_node_capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }
    if (this.ne.insert(point)) {
      return true;
    }
    if (this.nw.insert(point)) {
      return true;
    }
    if (this.se.insert(point)) {
      return true;
    }
    return this.sw.insert(point);
  }

  search(point) {
    if (!this.boundary.containsPoint(point)) {
      return false;
    }
    for (var pt of this.points) {
      if (point.isEqual(pt)) {
        return true;
      }
    }
    if (!this.divided) {
      return false;
    }
    if (this.ne.search(point)) {
      return true;
    }
    if (this.nw.search(point)) {
      return true;
    }
    if (this.se.search(point)) {
      return true;
    }
    return this.sw.search(point);
  }

  query(range, found) {
    if (found === undefined) {
      found = [];
    }
    if (!range.intersectsAABB(this.boundary)) {
      return;
    }
    for (var pt of this.points) {
      if (range.containsPoint(pt)) {
        found.push(pt);
      }
    }
    if (this.divided) {
      this.ne.query(range, found);
      this.nw.query(range, found);
      this.se.query(range, found);
      this.sw.query(range, found);
    }
    return found;
  }

  kClosest(searchPoint, k, radar, pq) {
    if (pq === undefined) {
      pq = new PriorityQueue();
    }
    if (!radar.intersectsAABB(this.boundary)) {
      return;
    }
    for (var pt of this.points) {
      if (radar.containsPoint(pt)) {
        pq.push(pt, searchPoint.sqDist(pt));
        if (pq.size() > k) {
          pq.pop();
        }
      }
    }
    if (this.divided) {
      this.ne.kClosest(searchPoint, k, radar, pq);
      this.nw.kClosest(searchPoint, k, radar, pq);
      this.se.kClosest(searchPoint, k, radar, pq);
      this.sw.kClosest(searchPoint, k, radar, pq);
    }
    return pq;
  }
}
