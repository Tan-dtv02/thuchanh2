import React from "react";
import { TextField, Typography, Button } from "@mui/material";

import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function LoginRegister({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    login_name: "",
    password: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
  });
  const [registerMessage, setRegisterMessage] = useState("");
  const handleLogin = async () => {
    const data = await fetchModel("/admin/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ login_name: loginName, password: password }),
    });
    if (!data.user) {
      return;
    }
    localStorage.setItem("user", JSON.stringify(data.user));
    onLogin(data.user);
  };
  const handleRegisterChange = (field, value) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleRegister = async () => {
    setRegisterMessage("");
    const data = await fetchModel("/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    setRegisterMessage(data.message);
  };
  return (
    <>
      <Typography variant="body1">
        <div>
          <h1>Please login</h1>
          <TextField
            label="login_name"
            type="text"
            value={loginName}
            onChange={(e) => {
              setLoginName(e.target.value);
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
        <div>
          <h2>Register</h2>
          <TextField
            label="login_name"
            type="text"
            value={registerData.login_name}
            onChange={(e) => {
              handleRegisterChange("login_name", e.target.value);
            }}
          />
          <TextField
            label="password"
            type="password"
            value={registerData.password}
            onChange={(e) => {
              handleRegisterChange("password", e.target.value);
            }}
          />
          <TextField
            label="first_name"
            type="text"
            value={registerData.first_name}
            onChange={(e) => {
              handleRegisterChange("first_name", e.target.value);
            }}
          />
          <TextField
            label="last_name"
            type="text"
            value={registerData.last_name}
            onChange={(e) => {
              handleRegisterChange("last_name", e.target.value);
            }}
          />
          <TextField
            label="location"
            type="text"
            value={registerData.location}
            onChange={(e) => {
              handleRegisterChange("location", e.target.value);
            }}
          />
          <TextField
            label="Description"
            type="description"
            value={registerData.description}
            onChange={(e) => {
              handleRegisterChange("description", e.target.value);
            }}
          />
          <TextField
            label="occupation"
            type="text"
            value={registerData.occupation}
            onChange={(e) => {
              handleRegisterChange("occupation", e.target.value);
            }}
          />
          <Button onClick={handleRegister}>Register Me</Button>
          {registerMessage && <Typography>{registerMessage}</Typography>}
        </div>
      </Typography>
    </>
  );
}

export default LoginRegister;
