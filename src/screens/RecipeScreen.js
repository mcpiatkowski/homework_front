import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("/api/recipes/");
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
