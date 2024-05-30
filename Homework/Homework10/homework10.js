function customHashFunction(str) {
  let hash = 5381; //Using a large prime number as the initial value
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return Math.abs(hash);
}


class LinkedListNode {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable {
  constructor(initialSize = 100) {
    this.size = initialSize;
    this.buckets = Array(this.size).fill(null).map(() => null);
    this.count = 0;
    this.loadFactor = 0.75;
  }

  _hash(key) {
    return customHashFunction(key) % this.size;
  }

  _resize(newSize) {
    const oldBuckets = this.buckets;
    this.size = newSize;
    this.buckets = Array(newSize).fill(null).map(() => null);
    this.count = 0;

    for (let bucket of oldBuckets) {
      let current = bucket;
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    }
  }

  insert(key, value) {
    if (this.count / this.size > this.loadFactor) {
      this._resize(this.size * 2);
    }
    const index = this._hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedListNode(key, value);
    } else {
      let current = this.buckets[index];
      while (current) {
        if (current.key === key) {
          current.value = value; //Update existing key
          return;
        }
        if (!current.next) break;
        current = current.next;
      }
      current.next = new LinkedListNode(key, value);
    }
    this.count++;
  }

  retrieve(key) {
    const index = this._hash(key);
    let current = this.buckets[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  delete(key) {
    const index = this._hash(key);
    let current = this.buckets[index];
    if (!current) return false;
    if (current.key === key) {
      this.buckets[index] = current.next;
      this.count--;
      return true;
    }
    let prev = null;
    while (current) {
      if (current.key === key) {
        prev.next = current.next;
        this.count--;
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
  }

  *[Symbol.iterator]() {
    for (let bucket of this.buckets) {
      let current = bucket;
      while (current) {
        yield [current.key, current.value];
        current = current.next;
      }
    }
  }
}



//Test Cases:

function runTests() {
  const hashTable = new HashTable();

  //Insertion
  hashTable.insert("key1", "value1");
  console.log(hashTable.retrieve("key1") === "value1" ? "Pass" : "Fail"); //Output: Pass

  //Updating a value
  hashTable.insert("key1", "value2");
  console.log(hashTable.retrieve("key1") === "value2" ? "Pass" : "Fail");//Output: Pass

  //Insertion of multiple keys
  hashTable.insert("key2", "value3");
  console.log(hashTable.retrieve("key2") === "value3" ? "Pass" : "Fail");//Output: Pass

  //Retrieval of a non-existent key
  console.log(hashTable.retrieve("key3") === null ? "Pass" : "Fail");//Output: Pass

  //Deletion
  console.log(hashTable.delete("key1") === true ? "Pass" : "Fail");//Output: Pass
  console.log(hashTable.retrieve("key1") === null ? "Pass" : "Fail");//Output: Pass

  //Deletion of a non-existent key
  console.log(hashTable.delete("key3") === false ? "Pass" : "Fail");//Output: Pass


  hashTable.insert("a", "valueA");
  hashTable.insert("b", "valueB");
  hashTable.insert("c", "valueC");
  console.log(hashTable.retrieve("a") === "valueA" ? "Pass" : "Fail");//Output: Pass
  console.log(hashTable.retrieve("b") === "valueB" ? "Pass" : "Fail");//Output: Pass
  console.log(hashTable.retrieve("c") === "valueC" ? "Pass" : "Fail");//Output: Pass

  //Handling of collisions
  for (let i = 0; i < 20; i++) {
    hashTable.insert(`key${i}`, `value${i}`);
  }
  let allPass = true;
  for (let i = 0; i < 20; i++) {
    if (hashTable.retrieve(`key${i}`) !== `value${i}`) {
      allPass = false;
      break;
    }
  }
  console.log(allPass ? "Pass" : "Fail");//Output: Pass
}

runTests();


/*

Provide clear and concise documentation for your code. Explain how your custom hash function and hash table class work.
Write a brief analysis of the performance of your custom hash function and hash table. Discuss the time complexity of key operations (insertion, retrieval, deletion) and any trade-offs you made in your implementation.

### **Submission**

Submit your JavaScript code for the custom hash function and hash table along with your documentation and analysis. Include test cases that demonstrate the correctness and efficiency of your implementation.



### **Bonus Challenge**

For an extra challenge, consider implementing additional features for your hash table, such as resizing the table dynamically to maintain an efficient load factor, or implementing a method to iterate through all key-value pairs in the hash table.

*/