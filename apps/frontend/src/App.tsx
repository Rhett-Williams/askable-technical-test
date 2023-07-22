import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Create from "./pages/Create";
import ViewProduct from "./pages/ViewProduct";
import Navbar from "./components/Navbar";
// import Navbar from './components/Navbar.tsx'

const App = () => {
  return (
    <Router>
      <Navbar />
      <hr />
      <div>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/create" element={<Create />} />
          <Route path="/viewProduct/:productId" element={<ViewProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
