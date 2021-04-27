import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import IngredientScreen from "./screens/IngredientsScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/recipes' component={RecipeScreen} />
          <Route path='/ingredients' component={IngredientScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
