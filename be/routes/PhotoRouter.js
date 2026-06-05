const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");
const mongoose = require("mongoose");
router.post("/", async (request, response) => {});

// const User = require("../db/userModel");n

router.get("/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return response.status(400).json({ error: "Invalid user id" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }
    const photos = await Photo.find({ user_id: userId });
    const result = await Promise.all(
      photos.map(async (photo) => {
        const comments = await Promise.all(
          (photo.comments || []).map(async (comment) => {
            const commentUser = await User.findById(
              comment.user_id,
              "_id first_name last_name"
            );
            return {
              _id: comment._id,
              comment: comment.comment,
              date_time: comment.date_time,
              user: commentUser
                ? {
                    _id: commentUser._id,
                    first_name: commentUser.first_name,
                    last_name: commentUser.last_name,
                  }
                : null,
            };
          })
        );
        return {
          _id: photo._id,
          user_id: photo.user_id,
          file_name: photo.file_name,
          date_time: photo.date_time,
          comments: comments,
        };
      })
    );
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch photos of user" });
  }
});
module.exports = router;
