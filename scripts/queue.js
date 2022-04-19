/*
Queue class

Methods: 
1) push(el)
2) top()
3) pop()
4) size()
5) empty()
*/

//store value along with its
class data {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// queue class
class Queue {
  constructor() {
    this.capacity = 1;
    this.sz = 0;
    this.front = 0;
    this.items = this.newArray(this.capacity);
  }
  
  newArray(len) {
    var arr = [];
    for (var i = 0; i < len; ++i) {
      arr[i] = new data(0, 0);
    }
    return arr;
  }

  push(val) {
    //its of type 'new data(x,y)'
    var cap = this.capacity;
    if (this.size() == cap) {
      var newArr = this.newArray(cap * 2);
      for (var i = 0; i < this.sz; i++) {
        var idx = (this.front + i) % cap;
        newArr[i] = this.items[idx];
      }
      this.capacity = 2 * cap;
      this.items = newArr;
      this.front = 0;
    }
    var idx = (this.front + this.sz) % this.capacity;
    this.items[idx] = val;
    this.sz = this.sz + 1;
  }

  top() {
    if (this.size() == 0) {
      console.log("queue underflow");
      return -1;
    }
    return this.items[this.front];
  }

  pop() {
    if (this.size() == 0) {
      console.log("queue underflow");
      return -1;
    }
    this.front = (this.front + 1) % this.capacity;
    this.sz = this.sz - 1;
  }

  size() {
    return this.sz;
  }

  empty() {
    return this.sz == 0;
  }
}
