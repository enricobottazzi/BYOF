import React from "react";
import { useState } from "react";
import { addMember } from "../utils/interact.js";
import { Button, Col, Form } from "react-bootstrap";

export default function AddMember({ login, id }) {
const [member, setMember] = useState('');

  const addMem = () => {
    addMember( id, login, member);
  };

  return (
    <div>
    <Col sm={2}>
        <Form.Control size="sm" value={member} onInput={(e) => setMember(e.target.value)} placeholder="Member Address"/>
        <Button variant="primary" onClick={addMem}>Add Member</Button>
    </Col>
    </div>
  );
}