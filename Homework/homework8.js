class Book {
    constructor(title, author, isbn, price, availability) { //Constructor method is used to initialize new Book objects with the provided properties.
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.availability = availability;
    }
}


class FictionBook extends Book { //Createed a subclass FictionBook to help demostrate polymorphism.
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this.genre = "Fiction";
    }
}


class NonFictionBook extends Book { //Created a subclass NonFictionBook to help demostrate polymorphism.
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this.genre = "Non-Fiction";
    }
}


class User {
    static idCounter = 0; //Added the static property "idCounter" to the User class to keep track of the last assigned user ID.

    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.userId = ++User.idCounter; //We increment idCounter by 1 and assign the new value to userId, ensuring that each user gets a unique ID.
    }
}


class Cart {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    calculateTotalPrice() { //The "calculateTotalPrice" method calculates the total price of all the books in the cart by summing up their prices.
        let totalPrice = 0;
        for (const book of this.books) {
            totalPrice += book.price;
        }
        return totalPrice;
    }
}


class Order extends Cart { //Using the extends keyword to make the Order class inherit from the Cart class.
    constructor(user, books) {
        super(); //Calling the "super()" method to invoke the constructor of the parent class (Cart) and initialize the inherited properties and methods.
        this.user = user;
        this.books = books;
        this.totalPrice = this.calculateTotalPrice();
    }
}


//Instantiating Book objects:

const books = [ //Created four sample books with their respective titles, authors, ISBNs, prices, and availability.
    new FictionBook("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 10.99, true),
    new FictionBook("To Kill a Mockingbird", "Harper Lee", "9780061120084", 12.99, true),
    new NonFictionBook("1984", "George Orwell", "9780451524935", 8.99, false),
    new FictionBook("Pride and Prejudice", "Jane Austen", "9780141439518", 9.99, true)
];

//Instantiating User objects.

const users = [ //Created two sample users with their names and email addresses.
    new User("Alice", "alice@example.com"),
    new User("Bob", "bob@example.com")
];



//Simulating users adding books to their cart:

const aliceCart = new Cart();
aliceCart.addBook(books[0]); //Added "The Great Gatsby" to Alice's cart.
aliceCart.addBook(books[1]); //Added "To Kill a Mockingbird" to Alice's cart.

const bobCart = new Cart();
bobCart.addBook(books[2]); //Added "1984" to Bob's cart.
bobCart.addBook(books[3]); //Added "Pride and Prejudice" to Bob's cart.


//Simulating users placing an order:

const aliceOrder = new Order(users[0], aliceCart.books); //Alice places an order with the books in her cart.
const bobOrder = new Order(users[1], bobCart.books); //Bob places an order with the books in his cart.



//Display orders:

console.log("Alice's Order:", aliceOrder);
console.log("Bob's Order:", bobOrder);