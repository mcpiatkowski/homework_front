import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");
  const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  const accessToken = JSON.parse(localStorage.getItem("access"));

  async function fetchIngredients() {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axios.get("/api/ingredients/", config);
    setIngredients(data);
    setError("");
  }

  async function fetchRefresh() {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/token/refresh/",
      { refresh: refreshToken },
      config
    );
    localStorage.setItem("access", JSON.stringify(data["access"]));
    localStorage.setItem("exp", JSON.stringify(data["exp"]));
    setError("");
  }

  useEffect(() => {
    if (error) {
      fetchRefresh().catch((err) => {
        console.log(err.message);
      });
    }

    fetchIngredients().catch((err) => {
      setError(err.response.status);
    });
  }, [error]);

  return (
    <div>
      <h1>Ingredients</h1>
      <Table striped bordered hover responsive className='my-3'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <th>{ingredient.id}</th>
              <th>{ingredient.name}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HomeScreen;
