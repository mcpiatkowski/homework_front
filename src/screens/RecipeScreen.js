import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const token = JSON.parse(localStorage.getItem("data"));
  console.log("Refresh:", token["refresh"]);
  console.log("Access:", token["access"]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe.id}>
            <h3>{recipe.name}</h3>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
