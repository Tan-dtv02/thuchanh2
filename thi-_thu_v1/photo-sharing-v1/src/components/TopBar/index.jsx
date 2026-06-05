import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import "./styles.css";
import { matchPath, useLocation } from "react-router-dom";
import models from "../../modelData/models";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation().pathname;
  // const [text, setText] = useState("");
  const userDetail = matchPath("/users/:userId", location);
  const photoDetail = matchPath("/photos/:userId", location);
  const match = userDetail || photoDetail;
  const userId = match ? match.params.userId : null;

  const user = userId ? models.userModel(userId) : null;
  const rightText = user
    ? userDetail
      ? `${user.first_name} ${user.last_name}`
      : `Photos of ${user.first_name} ${user.last_name}`
    : null;
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Tan Do Vafdhdgj
        </Typography>
        <Typography variant="h5" color="inherit">
          {rightText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
