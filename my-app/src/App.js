import "./App.css";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import Wallet from "./components/wallet";
import AddMember from "./components/addFriend";
import GetGang from "./components/viewList";
import AddGang from "./components/createGang";

function App() {
  const [login, setLogin] = useState();
  const [gang, setGang] = useState();

  return (
    <div className="App">
      <div className="wallet">
        <Wallet />
      </div>
      <div className="create">
        <AddGang/>
      </div>
      <div className="login">
        <Col sm={2}>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif" }}>Login here:</h5>
            <Form.Control size="sm" value={gang} onInput={(e) => setGang(e.target.value)} placeholder="Gang ID"/>
            <Form.Control size="sm" value={login} onInput={(e) => setLogin(e.target.value)} placeholder="Login Password"/>
        </Col>
      </div>
      <div className="add-member">
        <AddMember login={login} id={gang}/>
      </div>
      <div className="get">
        <GetGang login={login} id={gang} />
      </div>
    </div>
  );
}

export default App;
