import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";  
import Button  from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";  
import  Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import  Modal  from "react-bootstrap/Modal";


function ProductDetails () {
const { id } = useParams();
const navigate = useNavigate();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [deleted, setDeleted] = useState(false);
const [editing, setEditing] = useState(false);
const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
    });
 const [updated, setUpdated] = useState(false);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setFormData({
                    title: response.data.title,
                    price: response.data.price,
                    description: response.data.description,
                    category: response.data.category,
                    image: response.data.image
                 });
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load product details");
                setLoading(false);
            }); 
    }, [id]);

const deleteProduct = () => {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
        .then(() => {
            setDeleted(true);
             setShowModal(false);
                setTimeout(() => {
                    navigate("/products");
                }, 1500); // Redirect after 1.5 seconds
        })
        .catch((error) => {
            setError("Failed to delete product");
            setShowModal(false);
        });
};

const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
            setProduct(response.data);
            setEditing(false);
            setUpdated(true);
            setError(null);
        } catch (error) {
            setError("Failed to update product");
        }
    };

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>{error}</p>;   
    if (deleted) return (
        <Alert variant="success">Product has been deleted successfully!</Alert>
    );
    if (updated) return (
        <Alert variant="success">Product has been updated successfully!</Alert>
    );

    return (
        <Container>
            < Card className="product-card">
            <Card.Img className="product-image" variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                    <Card.Text>{product.category}</Card.Text>
                    <Button className="mx-2" onClick={() => setEditing(true)}>Edit Product</Button>
                    <Button onClick={deleteProduct}>Delete Product</Button>
                </Card.Body>
            </Card>
            {editing && (
                <Form className="mt-4" onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Update Product</Button>
                    <Button variant="secondary" className="mx-2" onClick={() => setEditing(false)}>Cancel</Button>
                </Form>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ProductDetails;

