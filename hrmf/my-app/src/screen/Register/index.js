import React, { useState } from "react";
import { Input, Button } from "antd";
import api from "../../Services/login";

function Register() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleRegister = async () => {
    try { 
      console.log("error agai");
      const response = await api.register(firstname, lastname, email, password);
      console.log("response", response);
      if (response.status === 200) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("error frse", error);
    }
  };

  return (
    <div
      style={{
        width: "40%",
        margin: "auto",
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "10%",
      }}
    >
      <Input
        type="name"
        placeholder="firstname"
        onChange={(e) => {
          setfirstname(e.target.value);
        }}
      />
      <Input
        type="name"
        placeholder="lastname"
        onChange={(e) => {
          setlastname(e.target.value);
        }}
      />
      <Input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <Input
        placeholder="password"
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <Button type="primary" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
}

export default Register;
