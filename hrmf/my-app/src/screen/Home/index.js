import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Table, Tag, Space } from "antd";
import login from "..   ../Services/login";

function Home() {
  const navigate = useNavigate();
  const islogin = localStorage.getItem("login");
  const [status, setStatus] = useState("clockin");
  const [onlyOnce, setOnlyOnce] = useState(false);
  const [tabledata, setTabledata] = useState([
    {
      key: "1",
      dateclockin: "16/05/2022",
      age: "10:15:00 AM",
      clockout: "07:47:42 PM",
      status: "Present",
    },
    {
      key: "2",
      clockin: "17/05/2022",
      age: "10:00:00 AM",
      address: "07:40:00 PM",
      status: "Present",
    },
    {
      key: "3",
      name: "18/05/2022",
      age: "10:30:00 AM",
      address: "07:30:00 PM",
      status: "Present",
    },
  ]);

  const clockin = () => {
    console.log("inside clock in");
    // localStorage.setItem("status", "clockout");
    if (onlyOnce) {
      message.info("you have already logged in for today");
    } else {
      setTabledata([
        ...tabledata,
        {
          key: "7",
          name: "19/05/2022",
          age: "5:24:34 PM",
          address: "",
          status: "Present",
        },
      ]);
      setStatus("clockout");
      setOnlyOnce(true);
    }
  };

  const clockout = () => {
    console.log("inside clock out");
    let temp = tabledata;
    // let objIndex = tabledata.findIndex((obj) => obj.key === "7");
    // console.log("Before update: ", tabledata[objIndex]);
    // temp[objIndex].address = moment(new Date().getTime()).format("hh:mm:ss A");
    // console.log("updated obj", temp);
    // setTabledata([...temp]);
    temp.pop();

    setTabledata([
      ...temp,

      {
        key: "7",
        name: "19/05/2022",
        age: "5:24:34 PM",
        address: "5:25:37 PM",
        status: "Present",
      },
    ]);
    // localStorage.setItem("status", "clockin");
    setStatus("clockin");
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Attendance Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "In Time",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Out Time",
      dataIndex: "address",
      key: "address",
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     name: "16/05/2022",
  //     age: "10:15:00 AM",
  //     address: "07:47:42 PM",
  //     status: "Present",
  //   },
  //   {
  //     key: "2",
  //     name: "17/05/2022",
  //     age: "10:00:00 AM",
  //     address: "07:40:00 PM",
  //     status: "Present",
  //   },
  //   {
  //     key: "3",
  //     name: "18/05/2022",
  //     age: "10:30:00 AM",
  //     address: "07:30:00 PM",
  //     status: "Present",
  //   },
  // ];

  return (
    <div style={{ height: "100%", backgroundColor: "white" }}>
      <div
        style={{
          position: "absolute",
          // backgroundColor: "pink",
          borderBottom: "1px solid black",
          height: 50,
          width: "100%",
        }}
      >
        <h1>HR management system</h1>{" "}
        {islogin ? (
          <Button
            type="primary"
            style={{
              right: 30,
              position: "absolute",
              bottom: 10,
              // margin: "10%",
            }}
            onClick={() => {
              localStorage.removeItem("login");
              window.location.href = "/";
            }}
          >
            logout
          </Button>
        ) : (
          <div>
            <Button
              type="primary"
              style={{
                right: 150,
                position: "absolute",
                bottom: 10,
                // margin: "10%",
              }}
              onClick={() => {
                navigate("login");
              }}
            >
              login
            </Button>{" "}
            <Button
              type="primary"
              style={{
                right: 30,
                position: "absolute",
                bottom: 10,
                // margin: "10%",
              }}
              onClick={() => {
                navigate("register");
              }}
            >
              Register
            </Button>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          backgroundColor: "white",
          height: "92%",
          width: 200,
          marginTop: 50,
          borderRight: "1px solid rgba(0, 0, 0, 0.7)",
          justifyContent: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              left: 550,
              top: 80,
              width: "100%",
              height: 10,
              // backgroundColor: "red",
              position: "absolute",
            }}
          >
            {islogin ? (
              <Table
                columns={columns}
                dataSource={tabledata}
                pagination={false}
                columnWidth="64px"
                style={{ width: 200 }}
              />
            ) : null}
            {/* <Table
              columns={columns}
              dataSource={tabledata}
              pagination={false}
              columnWidth="64px"
              style={{ width: 200, backgroundColor: "red" }}
            /> */}
          </div>
        </div>
        {islogin ? (
          <Button
            size="large"
            type="primary"
            style={{
              position: "absolute",
              alignItems: "center",
              bottom: 10,

              // margin: "10%",
            }}
            onClick={() => {
              // navigate("register");
              status === "clockout" ? clockout() : clockin();
            }}
          >
            {status === "clockin" ? "clockin" : "clockout"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
export default Home;
