// max heap

class PriorityQueue {
  constructor() {
    this.items = [];
    this.priority = [];
  }
  swap(i, j) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    [this.priority[i], this.priority[j]] = [this.priority[j], this.priority[i]];
  }
  upHeapify(i) {
    if (i == 0) {
      return;
    }

    var pi = Math.floor((i - 1) / 2);
    if (this.priority[i] > this.priority[pi]) {
      this.swap(i, pi);
      this.upHeapify(pi);
    }
  }
  push(data, prio) {
    this.items.push(data);
    this.priority.push(prio);
    this.upHeapify(this.size() - 1);
  }
  top() {
    if (this.size() == 0) {
      console.log("underflow");
      return -1;
    }
    return this.items[0];
  }
  downHeapify(pi) {
    var mn = pi;
    var li = 2 * pi + 1;
    if (li < this.size() && this.priority[li] > this.priority[mn]) {
      mn = li;
    }
    var ri = 2 * pi + 2;
    if (ri < this.size() && this.priority[ri] > this.priority[mn]) {
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
    this.priority.pop();
    this.downHeapify(0);
  }
  size() {
    return this.items.length;
  }
}
