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
function UserDetail({ loggedIn }) {
  const { userId } = useParams();
  // const user = models.userModel(userId);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!loggedIn) return;
    const fetchData = async () => {
      const data = await fetchModel("/api/user/" + userId);
      setUser(data);
    };

    fetchData();
  }, [userId]);
  return (
    <>
      {loggedIn && (
        <>
          <Typography variant="body1">
            <p>
              Name :{user.first_name} {user.last_name}
            </p>
            <p> Local: {user.location}</p>
            <p>Occupation: {user.occupation}</p>
            <p> Description: {user.description} </p>
            <Link to={`/photos/${userId}`}>View Photos</Link>
          </Typography>
        </>
      )}
    </>
  );
}

export default UserDetail;
