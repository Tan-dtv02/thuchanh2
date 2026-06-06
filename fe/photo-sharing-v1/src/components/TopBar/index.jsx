import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./styles.css";
import { matchPath, useLocation } from "react-router-dom";
// import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ loggedIn, onLogout }) {
  const location = useLocation().pathname;
  // const [text, setText] = useState("");
  // const userDetail = matchPath("/users/:userId", location);
  // const photoDetail = matchPath("/photos/:userId", location);
  // const match = userDetail || photoDetail;
  // const userId = match ? match.params.userId : null

  // const user = userId ? models.userModel(userId) : null;
  const [text, setText] = useState("");
  useEffect(() => {
    if (!loggedIn) return;
    const userDetail = matchPath("/users/:userId", location);
    const photoDetail = matchPath("/photos/:userId", location);
    const match = userDetail || photoDetail;
    if (!match) {
      setText("");
      return;
    }
    const fetchData = async () => {
      const data = await fetchModel(`/api/user/${match.params.userId}`);
      setText(
        userDetail
          ? `${data.first_name} ${data.last_name}`
          : `Photos of ${data.first_name} ${data.last_name}`
      );
    };
    fetchData();
  }, [location]);
  return (
    <>
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h5" color="inherit">
            Do Van Tan - B23DCKH102
          </Typography>
          <Typography variant="h5" color="inherit">
            {text}
          </Typography>
          {loggedIn ? (
            <>
              <Typography>
                Hi, {loggedIn.first_name} {loggedIn.last_name}
              </Typography>
              <Button onClick={onLogout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography>Please Login</Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopBar;
