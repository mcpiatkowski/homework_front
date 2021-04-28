import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    try {
      async function fetchProducts() {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token["access"]}`,
          },
        };

        const { data } = await axios.get("/api/recipes/", config);
        setRecipes(data);
      }
      fetchProducts();
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  }, []);

  return (
    <div>
      <h1>Recipes</h1>

      <Table striped bordered hover responsive className='my-3'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.name}</td>
              <td>super przepis</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error}
    </div>
  );
}

export default HomeScreen;
