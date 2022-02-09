const QT_node_capacity = 2;

class QuadTree {
  constructor(boundary) {
    this.boundary = boundary;
    this.points = [];
    this.divided = false;
    this.ne = null;
    this.nw = null;
    this.se = null;
    this.sw = null;
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
        if (pq.size() > k) pq.pop();
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
