const {
    response
} = require("express");
const express = require("express");

// model
const Book = require("../models/books");

const router = express.Router();

router.get("/", async (req, res) => {
    // return all books
    let books = req.query.title ?
        await Book.getBooks(req.query.title) :
        await Book.getBooks();

    if (books.length === 0)
        return res.status(404).json({
            message: "No books found",
            books,
        });

    return res.status(200).send({
        message: "Books found",
        books,
    });
});

router.get("/:id", async (req, res) => {
    // return a book
    let {
        id
    } = req.params;
    const book = await Book.getBook(id);

    if (!book)
        return res.status(404).json({
            message: "Book not found",
        });

    return res.status(200).send({
        message: "Book found",
        book,
    });
});

router.post("/add", async (req, res) => {
    // add a new book
    let newBook = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        publish_date: new Date(req.body.publish_date),
    };

    const result = await Book.addBook({
        ...newBook,
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
    });

    return res.status(200).send({
        message: "Book added successfully",
        book: {
            id: result.insertId,
            ...newBook,
        },
    });
});

router.delete("/:id", async (req, res) => {
    // delete a book
    let {
        id
    } = req.params;
    const result = await Book.deleteBookById(id);

    if (!result)
        return res.status(404).json({
            message: "Book not found",
        });

    return res.status(200).send({
        message: "Book deleted successfully",
        old: result.oldBook,
    });
});

router.put("/:id", async (req, res) => {
    // update a book
    let {
        id
    } = req.params;
    const updatedBook = {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        publish_date: new Date(req.body.publish_date),
        updated_at: new Date(),
    };
    const {
        result,
        oldBook,
        newBook
    } = await Book.updateBookById(
        updatedBook,
        id
    );

    console.log(oldBook);

    if (result.affectedRows === 0)
        return res.status(404).json({
            message: "Book not found",
        });

    return res.status(200).send({
        message: "Book updated successfully",
        old: oldBook,
        new: newBook,
    });
});

module.exports = router;