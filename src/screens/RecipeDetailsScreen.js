import React, { useState, useEffect } from "react";
import { Table, Row, Container } from "react-bootstrap";
import axios from "axios";

function RecipeDetailsScreen({ match }) {
  const [recipe, setRecipe] = useState([]);
  const [success, setSuccess] = useState(false);
  const token = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    async function fetchProducts() {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token["access"]}`,
        },
      };

      const { data } = await axios.get(`/api/recipe/${match.params.id}`, config);
      setRecipe(data);
      setSuccess(true);
    }
    fetchProducts();
  }, [match]);

  return (
    <div>
      <h1>RecipeDetailsScreen</h1>
      {success ? (
        <Container>
          <h1>{recipe.name}</h1>
          <Table striped bordered hover responsive className='my-3'>
            <thead>
              <tr>
                <th>Składniki:</th>
              </tr>
            </thead>
            <tbody>
              {recipe["ingredients"].map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        "refresh"
      )}
    </div>
  );
}

export default RecipeDetailsScreen;
