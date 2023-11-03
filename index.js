const express = require("express");
const mongoose = require("mongoose");
const BookModel = require("./models/BookModel");

const app = express();

app.use(express.json());

app.post("/books/create", (req, res) => {
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
app.get("/books", async (req, res) => {
  // async-await method
  try {
    let allBooks = await BookModel.find();

    return res.json({
      message: "All Books fetched",
      data: allBooks,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }

  // then-catch method
  // BookModel.find()
  //   .then((books) => {
  //     return res.json({
  //       message: "All Books has been fetched",
  //       data: books,
  //     });
  //   })
  //   .catch((e) => {
  //     return res.status(500).json({
  //       message: e.message,
  //     });
  //   });
});

// Get Single Book

app.get("/books/:bookId", async (req, res) => {
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
app.delete("/books/:bookId", async (req, res) => {
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
app.put("/books/:bookId", async (req, res) => {
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

app.listen(8888, () => {
  console.log("Server is running on port 8888 !!!");
  mongoose
    .connect("mongodb://localhost:27017/helloworld")
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
});
