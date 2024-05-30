# Custom Hash Function and Hash Table

## Custom Hash Function

The custom hash function provided generates a hash code for a given string input. It utilizes the DJB2 algorithm, which iterates over each character of the string, applying a series of bitwise operations to generate a hash value. The function ensures a uniform distribution of hash codes by incorporating a prime number (5381) and left-shifting operations.

## Hash Table Class

The `HashTable` class implements a hash table data structure using separate chaining for collision resolution.

### Initialization

When creating a new instance of `HashTable`, you can optionally specify the initial size of the hash table. By default, it's initialized with a size of 100.

### Insertion

The `insert` method allows you to insert key-value pairs into the hash table. It computes the hash code for the given key using the custom hash function, determines the index in the internal array (`buckets`), and handles collisions by appending nodes to a linked list at the corresponding index.

### Retrieval

The `retrieve` method retrieves the value associated with a given key from the hash table. It calculates the hash code for the key, navigates to the corresponding bucket, and searches the linked list within that bucket for the key-value pair.

### Deletion

The `delete` method removes a key-value pair from the hash table based on the provided key. Similar to retrieval, it computes the hash code, locates the bucket, and deletes the node containing the key-value pair from the linked list.

### Dynamic Resizing

The hash table dynamically resizes itself to maintain an efficient load factor (default load factor is 0.75). When the ratio of stored items to table size exceeds the load factor, the table size is doubled, and all items are rehashed and reinserted into the larger table.

### Iterator Method

The `HashTable` class implements the iterable protocol using the `Symbol.iterator` method. This allows you to iterate over all key-value pairs stored in the hash table using the `for...of` loop or other iterator-consuming methods.

## Performance Analysis

### Custom Hash Function Performance

- **Time Complexity**: O(n), where n is the length of the input string.

### Hash Table Performance

- **Insertion, Retrieval, and Deletion**: O(1) on average, O(n) in the worst case (when all keys hash to the same index).

- **Trade-offs**: There's a trade-off between memory usage and performance due to separate chaining. Dynamic resizing incurs a one-time performance cost when the size of the table is doubled, but it ensures efficient load factors and overall performance.

## Usage

You can use this custom hash function and hash table class to efficiently store and retrieve key-value pairs in your JavaScript applications. The provided implementation offers flexibility, performance, and ease of use.