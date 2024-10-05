// src/components/UserTable.js
import React from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

const UserTable = ({ users, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
          <Button type="link" onClick={() => navigate(`/user/${record.id}`)}>
            View Details
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      } // alternating row color
    />
  );
};

export default UserTable;
