import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("/api/ingredients/");
      setIngredients(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Ingredients</h1>
      <Row>
        {ingredients.map((ingredient) => (
          <Col key={ingredient.id}>
            <h3>{ingredient.name}</h3>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
