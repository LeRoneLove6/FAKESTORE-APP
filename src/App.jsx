import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import 'bootstrap/dist/css/bootstrap.min.css';


import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
