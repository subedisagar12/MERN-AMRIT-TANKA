const express = require("express");
const mongoose = require("mongoose");
const BookRouter = require("./routes/BookRoute");
const UserRouter = require("./routes/UserRoute");
const app = express();
const PORT = 8888;

app.use(express.json());
app.use("/books", BookRouter);
app.use("/users", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} !!!`);
  mongoose
    .connect("mongodb://localhost:27017/helloworld")
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => {
      console.log(e.message);
    });
});
