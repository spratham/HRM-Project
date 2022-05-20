import "./App.css";
import Login from "./screen/Login";
import "antd/dist/antd.css";
import Register from "./screen/Register";
import Home from "./screen/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{height:'100vh'}}>
      {/* <div style={{ flex: 1, height: "100vh" }}> */}
        {/* <Login></Login>  */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home/>} />
            {/* <Route path="/" element={<Home/>} /> */}
          </Routes>
        </Router>
      {/* </div> */}
    </div>
  );
}

export default App;
