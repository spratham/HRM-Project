import React, { useState } from "react";
import api from "../../Services/login";
import Register from "../Register";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";

function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpasssword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("error agai");
      const response = await api.login(username, password);
      console.log("response", response);
      if (response.status === 200) {
        message.success("successfully logged in");

        localStorage.setItem("login", true);
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Got error", error);
      message.error("wrong password");
    }
  };

  return (
    <>
      <h1>HR management system</h1>

      <Form
        style={{ marginTop: 200 }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          onChange={(e) => {
            setusername(e.target.value);
          }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          onChange={(e) => {
            setpasssword(e.target.value);
          }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
