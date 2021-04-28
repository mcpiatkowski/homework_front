import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("data"));

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

  useEffect(() => {
    fetchProducts().catch((err) => {
      setError(err.message);
      console.log(error);
    });
  }, [fetchProducts, error]);

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
            <LinkContainer key={recipe.id} to={`/recipe/${recipe.id}`}>
              <tr>
                <td>{recipe.id}</td>
                <td>{recipe.name}</td>
                <td>super przepis</td>
              </tr>
            </LinkContainer>
          ))}
        </tbody>
      </Table>
      {error}
    </div>
  );
}

export default HomeScreen;
