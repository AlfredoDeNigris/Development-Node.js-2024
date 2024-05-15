# Online Bookstore System

This project simulates the functioning of an online bookstore using JavaScript classes.
It includes classes for managing books, users, carts, and orders.

## Overview

The system consists of the following main classes:

### Book

Represents a book with properties such as title, author, ISBN, price, and availability.
It has subclasses for fiction and non-fiction books.

### User

Represents a user of the bookstore system. Each user has a unique ID, name, and email address.

### Cart

Represents a shopping cart for a user. It allows adding and removing books, as well as calculating the total price of the books in the cart.

### Order

Represents an order placed by a user. It extends the Cart class and includes the user who placed the order,
the books in the order, and the total price.

## Functionality

- **Adding Books**: Users can add books to their shopping carts.
- **Removing Books**: Users can remove books from their shopping carts.
- **Placing Orders**: Users can place orders containing the books in their shopping carts.
- **Calculating Total Price**: The system calculates the total price of books in a user's cart.



## Security Considerations

- **Encapsulation**: The system maintains encapsulation by organizing related data and behaviors into classes. Each class encapsulates its own state and functionality, reducing the risk of unintended interference and promoting code maintainability.

## Interaction between Objects

- Users interact with the system by adding books to their carts and placing orders.
- Each user has a separate cart and can only view and modify their own cart.
- Orders are created based on the books in a user's cart, ensuring that each order reflects the user's selections accurately.

## Usage

To run the system, simply execute the JavaScript file "homework8.js" . For example using the "node" command:

```bash
node homework8.js