const BookModel = require("../models/BookModel");

function createBook(req, res) {
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

    // if (req.query.author && req.query.price) {
    //   // DB query when both author and price come
    //   let filteredBooks = await BookModel.find({
    //     author: req.query.author,
    //     price: req.query.price,
    //   });
    //   return res.json({ data: filteredBooks });
    // }

    // if (req.query.author) {
    //   // Db query if author only comes
    //   let filteredBooks = await BookModel.find({
    //     author: req.query.author,
    //   });
    //   return res.json({ data: filteredBooks });
    // }

    // if (req.query.price) {
    //   // Db query if price only comes
    //   let filteredBooks = await BookModel.find({
    //     price: req.query.price,
    //   });
    //   return res.json({ data: filteredBooks });
    // }

    // // Db query is no query comes
    // let allBooks = await BookModel.find();
    // return res.json({ data: allBooks });
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
