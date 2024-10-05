// src/services/api.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
export const fetchUsers = () => axios.get(API_URL);

// Fetch user by id
export const fetchUserById = (id) => axios.get(`${API_URL}/${id}`);

// Create a new user
export const createUser = (userData) => axios.post(API_URL, userData);

// Update a user
export const updateUser = (id, updatedData) => axios.put(`${API_URL}/${id}`, updatedData);

// Delete a user
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
