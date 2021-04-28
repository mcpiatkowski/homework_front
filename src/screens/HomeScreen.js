import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    async function fetchToken() {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/token/",
        { username: username, password: password },
        config
      );

      setToken(data);
      localStorage.setItem("data", JSON.stringify(data));
    }
    fetchToken();
  };
  return (
    <div>
      <h1>Welcome!</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type='password'
            placeholder='Twoje hasło'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Zaloguj się
        </Button>
      </Form>
      <Row className='text-center'>
        <Col>Username: Chef</Col>
      </Row>
      <Row className='text-center'>
        <Col>Password: chef1234</Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
