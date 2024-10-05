// src/components/UserForm.js
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";

const UserForm = ({ selectedUser, onSubmit, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        ...selectedUser,
        username: `USER-${selectedUser.name.toLowerCase()}`,
      });
    } else {
      form.resetFields();
    }
  }, [selectedUser]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Name is required", min: 3 }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please enter a valid phone number" },
        ]}
      >
        <Input placeholder="Phone" />
      </Form.Item>
      <Form.Item name="username" label="Username">
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="street"
        label="Street"
        rules={[{ required: true, message: "Street is required" }]}
      >
        <Input placeholder="Street" />
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: "City is required" }]}
      >
        <Input placeholder="City" />
      </Form.Item>
      <Form.Item
        name="company"
        label="Company Name"
        rules={[
          { min: 3, message: "Company name must be at least 3 characters" },
        ]}
      >
        <Input placeholder="Company Name" />
      </Form.Item>
      <Form.Item
        name="website"
        label="Website"
        rules={[{ type: "url", message: "Please enter a valid URL" }]}
      >
        <Input placeholder="Website" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {selectedUser ? "Update User" : "Create User"}
      </Button>
      <Button onClick={onClose} style={{ marginLeft: 8 }}>
        Cancel
      </Button>
    </Form>
  );
};

export default UserForm;
