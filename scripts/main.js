var width = 100,
  height = 100;
var boundary = new AABB(50, 50, width, height);
var qt = new QuadTree(boundary);

for (var i = 0; i < 50; i++) {
  const p = new Point(Math.random() * width, Math.random() * height);
  qt.insert(p);
  //console.log(JSON.parse(JSON.stringify(p)));
}

//quadtree
console.log(qt);

//range query
var range = new AABB(50, 50, 100, 100);
var points = qt.query(range);
console.log(points);

//kClosest points
var searchPoint = new Point(50, 50);
var radar = new Circle(searchPoint.x, searchPoint.y, 20); //x,y,r
var pq = qt.kClosest(searchPoint, 5, radar); //pt, k, radar,
console.log(pq);
