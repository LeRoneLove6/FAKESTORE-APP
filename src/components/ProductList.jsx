import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>The products are Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-3">
            <Card>
              {product.image && (
                <Card.Img variant="top" src={product.image} alt={product.title} />
              )}
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
              <Link className="custom-button" to={`/products/${product.id}`}>
                View Details
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
