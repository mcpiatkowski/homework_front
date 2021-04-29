import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";

function RecipeDetailsScreen({ match }) {
  const [recipe, setRecipe] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  const accessToken = JSON.parse(localStorage.getItem("access"));

  async function fetchRecipe() {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axios.get(`/api/recipe/${match.params.id}`, config);
    setRecipe(data);
    setSuccess(true);
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
    setError("");
  }

  useEffect(() => {
    if (error) {
      fetchRefresh();
    } else {
      fetchRecipe().catch((err) => {
        setError(err);
      });
    }
  }, [match, error, setError]);

  return (
    <div>
      <h1>RecipeDetailsScreen</h1>
      {success && (
        <Container>
          <h1>
            {
              // @ts-ignore
              recipe.name
            }
          </h1>
          <Table striped bordered hover responsive className='my-3'>
            <thead>
              <tr>
                <th>Składniki:</th>
              </tr>
            </thead>
            <tbody>
              {
                // @ts-ignore
                recipe["recipe_ingredients"].map((ingredient, index) => (
                  <tr key={index}>
                    <td>{ingredient["name"]}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
}

export default RecipeDetailsScreen;
