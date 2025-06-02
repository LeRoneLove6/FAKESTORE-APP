import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function AddProduct() {
    const [product, setProduct] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://fakestoreapi.com/products", formData);
            setProduct(response.data);
            setSubmitted(true);
            setError(null);
        } catch (error) {
            setError(`Error submitting form. Please try again: ${error.message}`);
            setSubmitted(false);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mt-5">Add Product</h2>

            {submitted && product && (
                <Alert variant="success" dismissible>
                    {product.title} created successfully!
                </Alert>
            )}

            {error && (
                <Alert variant="danger" dismissible>
                    {error}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title"
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
                        placeholder="Enter a description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    /> 
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a price"
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
                        placeholder="Enter an image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddProduct;
               
