import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define UserPhotos, a React component of Project 4.
 */
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
function UserPhotos() {
  const { userId } = useParams();
  // const photosUser = models.photoOfUserModel(userId);

  const [photosUser, setPhotosUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchModel("/api/photo/" + userId);
      setPhotosUser(data);
    };
    fetchData();
  }, [userId]);
  return photosUser.map((photo) => (
    <div key={photo._id}>
      <p>{new Date(photo.date_time).toLocaleString()}</p>
      <img src={`/images/${photo.file_name}`} />
      {photo.comments &&
        photo.comments.map((cmt) => (
          <div key={cmt._id}>
            <p>{new Date(cmt.date_time).toLocaleString()}</p>

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
