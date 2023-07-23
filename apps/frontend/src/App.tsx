import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Products from "./pages/products/Products";
import Create from "./pages/Create";
import ViewProduct from "./pages/ViewProduct";
import Navbar from "./components/navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
