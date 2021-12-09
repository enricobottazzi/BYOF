import React from "react";
import { useState } from "react";
import { retrieveGang } from "../utils/interact.js";
import { Button, Col } from "react-bootstrap";

export default function GetGang({ login, id}) {
const [gang, setGang] = useState('');

  const getGang = async () => {
    let returned = await retrieveGang(id, login);
    let formatted = '';
    for(let i = 0; i < returned.length; i++) {
      formatted += returned[i] + "       "
    }
    setGang(formatted);
  };

  return (
    <div>
    <Col sm={2}>
        <Button variant="primary" onClick={getGang}>Retrieve Gang</Button>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif" }}>Returned Gang: {gang}</h5>
    </Col>
    </div>
  );
}