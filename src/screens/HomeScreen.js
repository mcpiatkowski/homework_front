import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const username = "chef";
  const passwordHard = "chef1234";

  useEffect(() => {
    async function fetchToken() {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/token/",
        { username: username, password: passwordHard },
        config
      );

      setToken(data);
      localStorage.setItem("accessToken", JSON.stringify(token));
      localStorage.setItem("data", JSON.stringify(data));
    }
    fetchToken();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <h1>Welcome!</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Twój e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      <Row className='py-3'>Access token: {token.access}</Row>
      <Row className='py-3'>Refresh token: {token.refresh}</Row>
    </div>
  );
}

export default HomeScreen;
