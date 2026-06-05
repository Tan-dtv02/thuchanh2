import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  // const user = models.userModel(userId);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchModel("/user/" + userId);
      setUser(data);
    };

    fetchData();
  }, [userId]);
  return (
    <>
      <Typography variant="body1">
        This should be the UserDetail view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user: {user._id}. You can fetch
        the model for the user from models.userModel.{" "}
        <p>
          Name :{user.first_name} {user.last_name}
        </p>
        <p> Local: {user.location}</p>
        <p>Occupation: {user.occupation}</p>
        <Link to={`/photos/${userId}`}>View Photos</Link>
      </Typography>
    </>
  );
}

export default UserDetail;
