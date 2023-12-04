const jwt = require("jsonwebtoken");
const BookModel = require("../models/BookModel");

function createBook(req, res) {
  // Logic to create book on database
  BookModel.create({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    userId: req.user.userId,
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
}

async function getAllBooks(req, res) {
  // async-await method
  try {
    let filterQuery = {};
    // filterQuery={}

    if (req.query.author) {
      filterQuery = { ...filterQuery, author: req.query.author };
      // filterQuery={author:"Robert"}
    }

    if (req.query.price) {
      filterQuery = { ...filterQuery, price: req.query.price };
      // filteredQuery={author:"Robert",price:200}
    }

    let books = await BookModel.find(filterQuery);

    return res.json({ data: books });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}

async function getSingleBook(req, res) {
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
}

module.exports = { createBook, getAllBooks, getSingleBook };
