const express = require("express");

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {});
UserRouter.post("/create", (req, res) => {});

module.exports = UserRouter;
