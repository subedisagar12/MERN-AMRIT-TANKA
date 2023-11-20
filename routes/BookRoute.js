const express = require("express");
const BookModel = require("../models/BookModel");

const BookRouter = express.Router();

BookRouter.post("/create", (req, res) => {
  // console.log(req.body);

  // Logic to create book on database
  BookModel.create({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    // address: req.body.address,
  })
    .then(() => {
      //   console.log("Data has been created");
      return res.json({ message: "Book has been created" });
    })
    .catch((e) => {
      //   console.log(e.message);
      return res.status(500).json({ message: e.message });
    });
});

// Get All books
BookRouter.get("/", async (req, res) => {
  // async-await method
  try {
    // lt,lte,gt,gte,eq,ne
    // let allBooks = await BookModel.find({ price: { $ne: 100 } });

    // Logical Operators ($or, $and, $nor,$not)
    let allBooks = await BookModel.find({ price: { $not: { $gt: 100 } } });

    return res.json({
      message: "All Books fetched",
      data: allBooks,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

// Get Single Book

BookRouter.get("/:bookId", async (req, res) => {
  try {
    let bookId = req.params.bookId;
    let singleBook = await BookModel.findOne({ _id: bookId });
    return res.json({
      message: "Single book fetched",
      data: singleBook,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

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
