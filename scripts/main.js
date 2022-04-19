var width = 500,
  height = 500;
var boundary = new AABB(width / 2, height / 2, width, height);
var qt = new QuadTree(boundary);

canvas = document.getElementById("myCanvas");
canvas.height = width;
canvas.width = height;
ctx = canvas.getContext("2d");
ctx.fillStyle = "red";

var allPoints = [];

var grid_dimension = 10;
var no_of_grids = width / grid_dimension;

//denoting what to do
query_type = 1;

//source and destination addresses in path making
var strt = new data(-1, -1);
var eend = new data(-1, -1);

function moveDataPoints() {
  var ln = allPoints.length;
  for (let index = 0; index < ln; index++) {
    var pt = allPoints[index];
    var x = pt.x,
      y = pt.y;
    var dx = Math.floor(Math.random() * 5),
      dy = Math.floor(Math.random() * 5);
    if (Math.random() * 1 > 0.5) x += dx;
    else x -= dx;
    if (Math.random() * 1 > 0.5) y += dy;
    else y -= dy;
    allPoints[index] = new Point(x, y);
  }
  generateQuad();
}

function generateQuad() {
  //movePoints();
  ctx.fillStyle = "red";
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  qt = new QuadTree(boundary);
  for (var pt of allPoints) {
    qt.insert(pt);
  }
  qt.draw();
}

function drawQuery(x, y, wid, hei) {
  var range = new AABB(x, y, wid, hei);
  ctx.strokeRect(range.left, range.top, range.w, range.h);
  var points = qt.query(range);
  ctx.fillStyle = "green";
  for (var i = 0; i < points.length; i++) {
    ctx.fillRect(points[i].x, points[i].y, 5, 5);
  }
}

function bnade(canvas, event, query_type) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  if (query_type == 1) {
    //data point
    allPoints.push(new Point(x, y));
    generateQuad();
  } else if (query_type == 2) {
    //query
    let wid = Math.random() * width;
    let hei = Math.random() * height;
    generateQuad();
    drawQuery(x, y, wid, hei);
  } else if (query_type == 3) {
    //k closesnt
    generateQuad();
    var searchPoint = new Point(x, y);
    var radar = new Circle(x, y, Math.random() * width);
    var pq = qt.kClosest(searchPoint, 5, radar); //pt, k, radar
    ctx.beginPath();
    ctx.arc(x, y, radar.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "green";
    while (pq.size()) {
      var pt = pq.top();
      ctx.fillRect(pt.x, pt.y, 5, 5);
      pq.pop();
    }
  } else if (query_type == 4) {
    //source point
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 4, 4);
    strt.x = Math.floor(x / grid_dimension);
    strt.y = Math.floor(y / grid_dimension);
    console.log(strt.x + " " + strt.y);
  } else if (query_type == 5) {
    //destination point
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 4, 4);
    eend.x = Math.floor(x / grid_dimension);
    eend.y = Math.floor(y / grid_dimension);
  }
}

canvas.addEventListener("click", function (e) {
  bnade(canvas, e, query_type);
});

function func1() {
  query_type = 1;
}

function func2() {
  query_type = 2;
}

function func3() {
  query_type = 3;
}

function addSource() {
  query_type = 4;
}

function addDestination() {
  query_type = 5;
}

function makePath() {
  query_type = 6;
  ctx.fillStyle = "blue";
  path();
}

var myVar;
function stopFunction() {
  clearInterval(myVar);
}

function startFunction() {
  myVar = setInterval("moveDataPoints()", 500);
}

function isValigrid_dimension(i, j) {
  if (i < 0 || j < 0 || i > no_of_grids || j > no_of_grids) return false;
  var range1 = new AABB(
    i * grid_dimension,
    j * grid_dimension,
    grid_dimension,
    grid_dimension
  );
  var points1 = qt.query(range1);
  if (points1.length > 0) return false;
  return true;
}

function path() {
  var par = new Array(no_of_grids + 1);
  var vis = new Array(no_of_grids + 1);
  for (var i = 0; i < no_of_grids + 1; i++) {
    par[i] = new Array(no_of_grids + 1);
    vis[i] = new Array(no_of_grids + 1);
  }
  for (var i = 0; i < no_of_grids + 1; i++) {
    for (var j = 0; j < no_of_grids + 1; j++) {
      par[i][j] = new data(-1, -1);
      vis[i][j] = false;
    }
  }
  var dx = [1, 1, 1, 0, 0, -1, -1, -1];
  var dy = [1, -1, 0, 1, -1, 1, -1, 0];
  var x1 = strt.x,
    y1 = strt.y,
    x2 = eend.x,
    y2 = eend.y;
  var q = new Queue();
  q.push(new data(x1, y1));
  vis[x1][y1] = true;
  while (!q.empty()) {
    var ux = q.top().x,
      uy = q.top().y;
    if (ux == x2 && uy == y2) break;
    q.pop();
    for (var id = 0; id < 8; id++) {
      var xnew = ux + dx[id],
        ynew = uy + dy[id];
      if (isValigrid_dimension(xnew, ynew) && !vis[xnew][ynew]) {
        vis[xnew][ynew] = true;
        par[xnew][ynew] = new data(ux, uy);
        q.push(new data(xnew, ynew));
      }
    }
  }
  ctx.fillRect(x2 * grid_dimension, y2 * grid_dimension, 4, 4);
  while (par[x2][y2].x != -1) {
    var nxt = par[x2][y2];
    ctx.fillRect(nxt.x * grid_dimension, nxt.y * grid_dimension, 4, 4);
    x2 = nxt.x;
    y2 = nxt.y;
  }
}

