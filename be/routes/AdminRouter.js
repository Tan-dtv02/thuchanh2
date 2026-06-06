const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");
const mongoose = require("mongoose");

router.post("/login", async (req, res) => {
  const { login_name, password } = req.body;
  const user = await User.findOne({ login_name: login_name });
  if (!user) {
    return res.status(400).json({ message: "Tai khoan khong chinh xác" });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: "Mat khẩu khong chinh xác" });
  }
  res.status(200).json({
    user: {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
});

router.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Dang xuat thanh cong" });
});

module.exports = router;
