import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Register from "./components/Register";
import Login from "./components/Login"; 
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import DeleteAccount from "./components/DeleteAccount";
import ImportProducts from './components/ImportProducts';
import { AuthProvider } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';



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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/import" element={<ImportProducts />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
