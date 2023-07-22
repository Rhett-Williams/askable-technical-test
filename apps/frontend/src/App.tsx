import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Create from './pages/Create';
import ViewProduct from './pages/ViewProduct';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>

        <hr />

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
