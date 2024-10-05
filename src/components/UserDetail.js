// src/components/UserDetail.js
import React, { useEffect, useState } from "react";
import { fetchUserById } from "../services/api";
import { useParams } from "react-router-dom";
import { Card, Spin, message } from "antd";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchUserById(id);
        setUser(response.data);
      } catch (error) {
        message.error("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) return <Spin />;

  return user ? (
    <Card title={user.name}>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>
        Address: {user.address.street}, {user.address.city}
      </p>
      <p>Company: {user.company?.name}</p>
      <p>Website: {user.website}</p>
    </Card>
  ) : (
    <p>User not found</p>
  );
};

export default UserDetail;
