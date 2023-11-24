const express = require("express");
const BookModel = require("../models/BookModel");

const BookRouter = express.Router();

// Controller Import
const {
  createBook,
  getAllBooks,
  getSingleBook,
} = require("../controllers/BookController");

BookRouter.post("/create", createBook);

// Get All books
BookRouter.get("/", getAllBooks);

// Get Single Book

BookRouter.get("/:bookId", getSingleBook);

// Delete the book
BookRouter.delete("/:bookId", async (req, res) => {
  try {
    let bookId = req.params.bookId;
    let deletedBook = await BookModel.findByIdAndDelete(bookId);
    return res.json({
      message: "Book has been deleted",
      data: deletedBook,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

// update book
BookRouter.put("/:bookId", async (req, res) => {
  try {
    let bookId = req.params.bookId;
    await BookModel.findOneAndUpdate({ _id: bookId }, req.body);
    return res.json({ message: "Book has been updated" });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

module.exports = BookRouter;
