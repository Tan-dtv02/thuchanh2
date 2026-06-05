const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {});

router.get("/list", async (request, response) => {
  const users = await User.find({}, "_id first_name last_name");
  response.json(users);
});

router.get("/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(
      userId,
      "_id first_name last_name location description occupation"
    );
    response.status(200).json(user);
  } catch (e) {
    response.status(400).send("Not Found");
  }
});

module.exports = router;
