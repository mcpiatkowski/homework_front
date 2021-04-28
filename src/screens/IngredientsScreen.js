import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [ingredients, setIngredients] = useState([]);
  const token = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    async function fetchProducts() {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token["access"]}`,
        },
      };

      const { data } = await axios.get("/api/ingredients/", config);
      setIngredients(data);
    }
    fetchProducts();
  }, []);

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
