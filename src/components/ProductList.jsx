 import { useState, useEffect  } from "react";
 import axios from "axios";
 import  Card  from "react-bootstrap/Card";
 import Container from "react-bootstrap/Container";
 import  Row  from "react-bootstrap/Row";
    import  Col  from "react-bootstrap/Col";
import { Link } from "react-router";
 
 function ProductList () {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
axios.get("https://fakestoreapi.com/products")
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError("Failed to fetch products");
            setLoading(false);
        })
    },[])

    if (loading) return <p>The products are Loading...</p>
    if (error) return <p>{error}</p>


    return (
        <>
        <Container>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src={product.image} alt={product.title}></Card.Img >
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                            </Card.Body>
                            <Link classsName="custome-button" to={`/products/${product.id}`}>View Details</Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>

        </>
    )
    }

export default ProductList;