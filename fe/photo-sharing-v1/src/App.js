import "./App.css";

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      localStorage.removeItem("user");
      return null;
    }
  });
  const handleLogin = (user) => {
    setLoggedIn(user);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(null);
  };
  const isLogged = loggedIn !== null;
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar loggedIn={loggedIn} onLogout={handleLogout} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList loggedIn={loggedIn} />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/users/:userId"
                  element={
                    isLogged ? (
                      <UserDetail loggedIn={loggedIn} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    isLogged ? (
                      <UserPhotos loggedIn={loggedIn} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/users"
                  element={
                    isLogged ? (
                      <UserList loggedIn={loggedIn} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/login"
                  element={
                    !isLogged ? (
                      <LoginRegister onLogin={handleLogin} />
                    ) : (
                      <Navigate to={`/users/${loggedIn._id}`} />
                    )
                  }
                />
                <Route
                  path="*"
                  element={
                    isLogged ? (
                      <Navigate to={`/users/${loggedIn._id}`} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
