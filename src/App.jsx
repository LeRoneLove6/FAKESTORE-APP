import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory'; // 👈 new
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './auth/AuthProvider'; // 👈 ensure AuthProvider is properly set

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
          <Route path="/checkout" element={<Checkout />} /> {/* 👈 new */}
          <Route path="/orders" element={<OrderHistory />} /> {/* 👈 new */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
