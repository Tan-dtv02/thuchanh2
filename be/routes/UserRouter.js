const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    login_name,
    password,
    first_name,
    last_name,
    location,
    description,
    occupation,
  } = req.body;
  if (!login_name || !password || !first_name || !last_name) {
    return res
      .status(400)
      .json({ message: "Vui long nhap day du cac truong bat buoc" });
  }
  const userExist = await User.findOne({ login_name: login_name });
  if (userExist) {
    return res.status(401).json({ message: "Tai khoan đã tồn tại" });
  }
  const newUser = await User.create({
    login_name: login_name,
    password: password,
    first_name: first_name,
    last_name: last_name,
    location: location,
    description: description,
    occupation: occupation,
  });
  await newUser.save();
  res.status(200).json({ message: "Dang ki thanh cong" });
});

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
