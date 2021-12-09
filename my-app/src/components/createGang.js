import React from "react";
import { createGang } from "../utils/interact.js";
import { Button, Col, Form } from "react-bootstrap";

export default function AddGang() {
    const addMem = () => {
    createGang();
  };

  return (
    <div>
    <Col sm={2}>
        <Button variant="primary" onClick={addMem}>Create Gang</Button>
    </Col>
    </div>
  );
}