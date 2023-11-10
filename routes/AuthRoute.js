const express = require("express");
const bcrypt = require("bcrypt");

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

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    let registeredUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      gender: req.body.gender,
      dob: req.body.dob,
    });

    return res.json({
      message: "User has been registered",
      data: registeredUser,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

AuthRouter.post("/login", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    return res.json({ message: "Logged In Successfully", data: user });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = AuthRouter;
