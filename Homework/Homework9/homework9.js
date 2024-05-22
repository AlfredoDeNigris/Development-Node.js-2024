//Stack:

class Stack {
  constructor() {
    this.items = [];
  }


  push(element) { //Method to push an element to the stack
    this.items.push(element);
  }


  pop() { //Method to pop an element from the stack
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }

  peek() {  //Method to peek at the top element of the stack
    if (this.isEmpty()) {
      return "No elements in Stack";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() { //Method to check if the stack is empty
    return this.items.length === 0;
  }
}

//Test Cases:

const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek()); //Output: 20
console.log(stack.pop());  //Output: 20
console.log(stack.pop());  //Output: 20
console.log(stack.pop());  //Output: Underflow

//Queue:

class Queue {
  constructor() {
    this.items = [];
  }


  enqueue(element) { //Method to enqueue an element to the queue
    this.items.push(element);
  }


  dequeue() { //Method to dequeue an element from the queue
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }


  peek() { //Method to peek at the front element of the queue
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[0];
  }


  isEmpty() { //Method to check if the queue is empty
    return this.items.length === 0;
  }
}

//Test Cases:

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.peek()); //Output: 10
console.log(queue.dequeue()); //Output: 10
console.log(queue.dequeue()); //Output: 20
console.log(queue.dequeue()); //Output: Underflow

//Binary Tree:

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }


  insert(data) { //Method to insert a node in the binary tree
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }


  search(node, data) { //Method to search for a node in the binary tree
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return node;
    }
  }


  inorder(node) { //In-order traversal
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }


  preorder(node) { //Pre-order traversal
    if (node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }


  postorder(node) { //Post-order traversal
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }
}

//Test Cases:

const tree = new BinaryTree();
tree.insert(10);
tree.insert(20);
tree.insert(5);
console.log("In-order traversal:");
tree.inorder(tree.root); //Output: 5 10 20
console.log("Search for 20:");
console.log(tree.search(tree.root, 20)); //Output: Node { data: 20, left: null, right: null }

//Graph:

class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) { //Method to add a vertex to the graph
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) { //Method to add an edge to the graph
    if (!this.adjList.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.adjList.has(vertex2)) {
      this.addVertex(vertex2);
    }
    this.adjList.get(vertex1).push(vertex2);
    this.adjList.get(vertex2).push(vertex1); //For undirected graph
  }


  dfs(startingNode) { //Method for depth-first search
    const visited = new Set();
    this.dfsUtil(startingNode, visited);
  }

  dfsUtil(vertex, visited) {
    visited.add(vertex);
    console.log(vertex);

    const neighbors = this.adjList.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfsUtil(neighbor, visited);
      }
    }
  }


  bfs(startingNode) { //Method for breadth-first search
    const visited = new Set();
    const queue = [startingNode];

    visited.add(startingNode);

    while (queue.length > 0) {
      const vertex = queue.shift();
      console.log(vertex);

      const neighbors = this.adjList.get(vertex);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
}

//Test Cases:

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');

console.log("DFS traversal starting from vertex A:");
graph.dfs('A'); //Output: A B C

console.log("BFS traversal starting from vertex A:");
graph.bfs('A'); //Output: A B C

//Singly Linked List:

class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }


  insert(data) { //Method to insert a node at the end of the linked list
    const newNode = new LinkedListNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }


  delete(data) {  //Method to delete a node with a given value
    if (this.head === null) {
      return "List is empty";
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let previous = null;

    while (current !== null && current.data !== data) {
      previous = current;
      current = current.next;
    }

    if (current === null) {
      return "Node not found";
    }

    previous.next = current.next;
  }


  search(data) { //Method to search for a node with a given value
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return "Node not found";
  }


  printList() { //Method to print the linked list
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
}

//Test Cases:

const linkedList = new LinkedList();
linkedList.insert(10);
linkedList.insert(20);
linkedList.insert(30);
console.log("List after inserts:");
linkedList.printList(); //Output:10 20 30

linkedList.delete(20);
console.log("List after deleting node with value 20:");
linkedList.printList(); //Output: 10 30

console.log("Search for node with value 30:");
console.log(linkedList.search(30)); //Output: LinkedListNode { data: 30, next: null }

//Stack with Minimum and Maximum Operations:

class StackWithMinMax {
  constructor() {
    this.mainStack = [];
    this.minStack = [];
    this.maxStack = [];
  }

  push(element) {
    this.mainStack.push(element);

    if (this.minStack.length === 0 || element <= this.getMin()) {
      this.minStack.push(element);
    }

    if (this.maxStack.length === 0 || element >= this.getMax()) {
      this.maxStack.push(element);
    }
  }

  pop() {
    if (this.mainStack.length === 0) {
      return "Underflow";
    }

    const poppedElement = this.mainStack.pop();

    if (poppedElement === this.getMin()) {
      this.minStack.pop();
    }

    if (poppedElement === this.getMax()) {
      this.maxStack.pop();
    }

    return poppedElement;
  }

  getMin() {
    if (this.minStack.length === 0) {
      return "Stack is empty";
    }
    return this.minStack[this.minStack.length - 1];
  }

  getMax() {
    if (this.maxStack.length === 0) {
      return "Stack is empty";
    }
    return this.maxStack[this.maxStack.length - 1];
  }
}

//Test Cases:

const stack2 = new StackWithMinMax();
stack2.push(10);
stack2.push(20);
stack2.push(5);
console.log(stack2.getMin()); //Output: 5
console.log(stack2.getMax()); //Output: 20
console.log(stack2.pop());    //Output: 5
console.log(stack2.getMin()); //Output: 10
console.log(stack2.getMax()); //Output: 20

// Demonstration:

const stack3 = new StackWithMinMax();
stack3.push(10);
stack3.push(20);
stack3.push(5);
stack3.push(15);
stack3.push(25);
console.log("Current stack:", stack3.mainStack);
console.log("Minimum element:", stack3.getMin()); //Output: 5
console.log("Maximum element:", stack3.getMax()); //Output: 25
console.log("Popped element:", stack3.pop());    //Output: 25
console.log("Current stack after pop:", stack3.mainStack);
console.log("Minimum element:", stack3.getMin()); //Output: 10
console.log("Maximum element:", stack3.getMax()); //Output: 20

//Is Binary Tree a Binary Search Tree (BST)?:

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function isBST(root, min = null, max = null) {
  if (root === null) {
    return true;
  }

  if ((min !== null && root.data <= min) || (max !== null && root.data >= max)) {
    return false;
  }

  return isBST(root.left, min, root.data) && isBST(root.right, root.data, max);
}

//Test Case:

const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);

console.log(isBST(root)); //Output:true

// Demonstration:

const root2 = new TreeNode(25);
root2.left = new TreeNode(12);
root2.right = new TreeNode(13);
root2.left.left = new TreeNode(22);
root2.left.right = new TreeNode(36);

console.log("Is the binary tree a BST?", isBST(root2)); //Output: false

//Shortest Path Algorithms in a Graph:

//Dijkstra's Algorithm:

class Graph2 {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2, weight) {
    if (!this.adjList.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.adjList.has(vertex2)) {
      this.addVertex(vertex2);
    }
    this.adjList.get(vertex1).push({ node: vertex2, weight: weight });
    this.adjList.get(vertex2).push({ node: vertex1, weight: weight }); //For undirected graph
  }

  dijkstra(startVertex) {
    const distances = {};
    const visited = new Set();
    const pq = new PriorityQueue();

    distances[startVertex] = 0;
    this.adjList.forEach((_, vertex) => {
      if (vertex !== startVertex) {
        distances[vertex] = Infinity;
      }
    });

    pq.enqueue(startVertex, 0);

    while (!pq.isEmpty()) {
      const { value: currentVertex } = pq.dequeue();
      visited.add(currentVertex);

      this.adjList.get(currentVertex).forEach(neighbor => {
        if (!visited.has(neighbor.node)) {
          const distance = distances[currentVertex] + neighbor.weight;

          if (distance < distances[neighbor.node]) {
            distances[neighbor.node] = distance;
            pq.enqueue(neighbor.node, distance);
          }
        }
      });
    }

    return distances;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(value, priority) {
    const newNode = new QNode(value, priority);
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > newNode.priority) {
        this.items.splice(i, 1, newNode);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(newNode);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class QNode {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

//Test Case:

const graph2 = new Graph2();
graph2.addVertex('A');
graph2.addVertex('B');
graph2.addVertex('C');
graph2.addEdge('A', 'B', 1);
graph2.addEdge('A', 'C', 4);
graph2.addEdge('B', 'C', 2);

const distances = graph2.dijkstra('A');
console.log(distances); //Output: { A: 0, B: 1, C: 3 }

// Demonstration:

const graph3 = new Graph2();
graph3.addVertex('X');
graph3.addVertex('Y');
graph3.addVertex('Z');
graph3.addVertex('W');
graph3.addEdge('X', 'Y', 3);
graph3.addEdge('X', 'Z', 6);
graph3.addEdge('Y', 'Z', 2);
graph3.addEdge('Y', 'W', 1);
graph3.addEdge('Z', 'W', 5);

const distances2 = graph3.dijkstra('X');
console.log("Shortest distances from X:", distances2); //Output: { X: 0, Y: 3, Z: 5, W: 4 }

//Breadth-First Search (BFS):

class Graph4 {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjList.has(vertex1)) {
      this.addVertex(vertex1);
    }
    if (!this.adjList.has(vertex2)) {
      this.addVertex(vertex2);
    }
    this.adjList.get(vertex1).push(vertex2);
    this.adjList.get(vertex2).push(vertex1); //For undirected graph
  }

  bfsShortestPath(startVertex, endVertex) {
    const visited = new Set();
    const queue = [[startVertex]];
    visited.add(startVertex);

    while (queue.length > 0) {
      const path = queue.shift();
      const vertex = path[path.length - 1];

      if (vertex === endVertex) {
        return path;
      }

      this.adjList.get(vertex).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          const newPath = [...path, neighbor];
          queue.push(newPath);
        }
      });
    }

    return null; //No path found
  }
}

//Test Case and Demonstration:

const graph5 = new Graph4();
graph5.addVertex('A');
graph5.addVertex('B');
graph5.addVertex('C');
graph5.addEdge('A', 'B');
graph5.addEdge('A', 'C');
graph5.addEdge('B', 'C');

const path = graph5.bfsShortestPath('A', 'C');
console.log("Shortest path from A to C using BFS:", path); //Output: [ 'A', 'C' ]

//Floyd's Cycle Detection Algorithm:

class LinkedListNode2 {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList2 {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new LinkedListNode2(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  detectCycle() {
    let slow = this.head;
    let fast = this.head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        return true; //Cycle detected
      }
    }

    return false; //No cycle detected
  }
}

//Test Case and Demonstration:

const linkedList2 = new LinkedList2();
linkedList2.insert(10);
linkedList2.insert(20);
linkedList2.insert(30);

//Creating a cycle for testing and 
const node1 = linkedList2.head;
const node2 = node1.next.next; //Node with value 30
node2.next = node1; //Creating a cycle

console.log("Does the linked list have a cycle?", linkedList2.detectCycle()); //Output: true


/*
### **Part 2: Algorithmic Problems**

1. Implement a class for a stack that supports finding the minimum and maximum elements in constant time (O(1)). Include methods for push, pop, getMin, and getMax.
2. Implement a function to determine if a binary tree is a binary search tree (BST). Provide an efficient algorithm that checks whether the tree satisfies the BST property.
3. Implement algorithms to find the shortest path between two vertices in a graph using both Dijkstra's algorithm and Breadth-First Search (BFS).
4. Implement a function to detect if a linked list has a cycle. Use Floyd's Cycle Detection Algorithm (Tortoise and Hare algorithm) to solve this problem efficiently.

### **Part 3: Demonstration**

1. Create instances of your data structures and demonstrate their usage with sample data. Show how the algorithms you implemented can solve practical problems using these data structures.

### **Part 4: Documentation**

Provide clear and concise comments and documentation for your code. Explain the purpose of each data structure, method, and algorithm. Describe how the algorithms work and their time complexity.

*/