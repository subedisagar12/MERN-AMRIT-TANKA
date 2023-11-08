const express = require("express");
const UserModel = require("../models/UserModel");

const AuthRouter = express.Router();

AuthRouter.post("/register", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ message: "Name is required" });
    }

    if (!req.body.email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!req.body.password) {
      return res.status(422).json({ message: "Password is required" });
    }

    if (!req.body.age) {
      return res.status(422).json({ message: "Age is required" });
    }

    // Validate unique email
    let userFound = await UserModel.findOne({ email: req.body.email });

    if (userFound) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    let registeredUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
    });

    return res.json({
      message: "User has been registered",
      data: registeredUser,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

AuthRouter.post("/login", (req, res) => {
  res.json({ message: "Login Success" });
});

module.exports = AuthRouter;
