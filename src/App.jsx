import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route  } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
     <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
