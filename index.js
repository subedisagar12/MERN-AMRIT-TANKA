const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const BookRouter = require("./routes/BookRoute");
const AuthRouter = require("./routes/AuthRoute");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/books", BookRouter);
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} !!!`);
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
});
