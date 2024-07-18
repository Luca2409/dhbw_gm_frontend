import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [size, setSize] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file || !size) {
            setMessage('Bitte wählen Sie eine Datei und geben Sie die Größe ein.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('size', size);

        try {
            const response = await axios.post('http://127.0.0.1:5000/userdata', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Fehler beim Hochladen der Datei');
            console.error(error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="text-center mb-4">Hallo Thomas!</h1>
                    <h6 className="text-center mb-4">Lade hier deine Körpergröße und ein Bild von dir hoch</h6>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formSize" className="mb-3">
                            <Form.Label>Körpergröße (cm)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Geben Sie Ihre Körpergröße ein"
                                value={size}
                                onChange={handleSizeChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Bild hochladen</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Button variant="secondary" type="submit" className="w-100">
                            Hochladen
                        </Button>
                    </Form>

                    {message && <Alert className="mt-4" variant="info">{message}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;

