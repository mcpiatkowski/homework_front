import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  const accessToken = JSON.parse(localStorage.getItem("access"));
  const expireTime = JSON.parse(localStorage.getItem("exp"));

  async function fetchRecipes() {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await axios.get("/api/recipes/", config);
    setRecipes(data);
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

    fetchRecipes().catch((err) => {
      setError(err.response.status);
    });
  }, [error]);

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
      <p>Refresh: {refreshToken}</p>

      <p>Access: {accessToken}</p>

      <p>Expire: {expireTime} sec. </p>
    </div>
  );
}

export default HomeScreen;
