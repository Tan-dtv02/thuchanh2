import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList({ loggedIn }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!loggedIn) return;
    const fetchData = async () => {
      const data = await fetchModel("/api/user/list");
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <>
      {loggedIn && (
        <>
          <List component="nav">
            {users.map((item) => (
              <>
                <ListItem>
                  <Link to={`/users/${item._id}`}>
                    {" "}
                    {`${item.first_name} ${item.last_name}`}
                  </Link>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </>
      )}
    </>
  );
}

export default UserList;
