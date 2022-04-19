/*
PriorityQueue using max heap implementation

Methods: 
1) push(data, priority) -> inserts data into priority queue. 
                           O(log2(n)) complexity 
2) top() -> return data having highest priority in priority queue.
                           O(1) complexity
3) pop() -> remove data having highest priority in priority queue.
                           O(log2(n)) complexity
4) size() -> return number of items in priority queue.
                           O(1) complexity
n is the size of priority queue
*/

//store data along with its priority
class node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
  }
}

//priority queue class
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  //private method
  swap(i, j) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }

  upHeapify(i) {
    if (i == 0) {
      return;
    }
    var pi = Math.floor((i - 1) / 2);
    if (this.items[i].priority > this.items[pi].priority) {
      this.swap(i, pi);
      this.upHeapify(pi);
    }
  }

  push(data, prio) {
    this.items.push(new node(data, prio));
    this.upHeapify(this.size() - 1);
  }

  top() {
    if (this.size() == 0) {
      console.log("underflow");
      return -1;
    }
    return this.items[0].data;
  }

  downHeapify(pi) {
    var mn = pi;
    var li = 2 * pi + 1;
    if (li < this.size() && this.items[li].priority > this.items[mn].priority) {
      mn = li;
    }
    var ri = 2 * pi + 2;
    if (ri < this.size() && this.items[ri].priority > this.items[mn].priority) {
      mn = ri;
    }
    if (mn != pi) {
      this.swap(mn, pi);
      this.downHeapify(mn);
    }
  }

  pop() {
    if (this.size() == 0) {
      console.log("underflow");
      return -1;
    }
    this.swap(0, this.size() - 1);
    this.items.pop();
    this.downHeapify(0);
  }

  size() {
    return this.items.length;
  }
}
