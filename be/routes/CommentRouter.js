const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");

router.post("/:photo_id", async (req, res) => {
  try {
    const photoId = req.params.photo_id;
    const { comment, user_id } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "rỗng" });
    }

    const photo = await Photo.findById(photoId);
    if (!photo) return res.status(404).json({ message: "Không tìm thấy" });

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy" });

    photo.comments.unshift({
      comment: comment,
      date_time: new Date(),
      user_id: user._id,
    });
    await photo.save();

    const newComment = photo.comments[0];
    res.status(200).json({
      _id: newComment._id,
      date_time: newComment.date_time,
      comment: newComment.comment,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
