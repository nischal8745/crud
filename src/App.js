import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchUsers, createUser, updateUser, deleteUser } from "./services/api";
import { message, Button, Drawer, Input, Spin } from "antd";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import UserDetail from "./components/UserDetail";
import "./styles.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to load users");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term as user types
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedUser(null);
    setDrawerVisible(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setDrawerVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleFormSubmit = async (userData) => {
    try {
      if (selectedUser) {
        const response = await updateUser(selectedUser.id, userData);
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? response.data : user
          )
        );
        message.success("User updated successfully");
      } else {
        const response = await createUser(userData);
        setUsers([...users, response.data]);
        message.success("User created successfully");
      }
      setDrawerVisible(false);
    } catch (error) {
      message.error("Failed to submit user data");
    }
  };

  return (
    <div className="app-container">
      <h1>CRUD React</h1>
      <Link to="/">
        <Button
          type="primary"
          onClick={handleCreate}
          style={{ marginBottom: 16 }}
        >
          Add New User
        </Button>
      </Link>
      <Input
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Drawer
        title={selectedUser ? "Edit User" : "Create User"}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        <UserForm
          selectedUser={selectedUser}
          onSubmit={handleFormSubmit}
          onClose={() => setDrawerVisible(false)}
        />
      </Drawer>
      {loading ? (
        <Spin size="large" style={{ margin: "20px auto", display: "block" }} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <UserTable
                users={filteredUsers} // Use filtered users for the table
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            }
          />
          <Route path="/user/:id" element={<UserDetail users={users} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
