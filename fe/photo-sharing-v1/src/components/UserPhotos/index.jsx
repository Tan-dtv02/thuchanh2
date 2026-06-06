import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";

const BASE_URL = "https://xz9ygh-8081.csb.app";

function UserPhotos({ loggedIn }) {
  const { userId } = useParams();
  const [photosUser, setPhotosUser] = useState([]);

  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchModel("/api/photo/" + userId);
      setPhotosUser(data);
    };
    fetchData();
  }, [userId]);

  const handleAddComment = async (photoId) => {
    const comment = newComments[photoId];
    if (!comment || comment.trim() === "") return;

    const data = await fetchModel(`/commentsOfPhoto/${photoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, user_id: loggedIn._id }),
    });

    setPhotosUser((prev) =>
      prev.map((photo) =>
        photo._id === photoId
          ? { ...photo, comments: [...(photo.comments || []), data] }
          : photo
      )
    );

    setNewComments((prev) => ({ ...prev, [photoId]: "" }));
  };

  return photosUser.map((photo) => (
    <div key={photo._id}>
      <p>Create at: {new Date(photo.date_time).toLocaleString()}</p>
      <img src={`/images/${photo.file_name}`} />
      <h1>Comment :</h1>

      <TextField
        label="Add comment"
        value={newComments[photo._id] || ""}
        onChange={(e) =>
          setNewComments((prev) => ({ ...prev, [photo._id]: e.target.value }))
        }
      />
      <Button onClick={() => handleAddComment(photo._id)}>Add comment</Button>

      {photo.comments &&
        photo.comments.map((cmt) => (
          <div key={cmt._id}>
            <p>Comment at: {new Date(cmt.date_time).toLocaleString()}</p>
            <Link to={`/users/${cmt.user._id}`}>
              {cmt.user.first_name} {cmt.user.last_name}
            </Link>
            <p>{cmt.comment}</p>
          </div>
        ))}
    </div>
  ));
}

export default UserPhotos;
