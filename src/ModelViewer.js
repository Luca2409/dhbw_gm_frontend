import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Container, Row, Col, Button, Spinner, Alert, Image } from 'react-bootstrap';

const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={0.5} />;
};

const ModelViewer = () => {
    const [models, setModels] = useState([]);
    const [thumbnails, setThumbnails] = useState({});
    const [selectedModel, setSelectedModel] = useState('');
    const [modelUrl, setModelUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/list_models');
                const models = response.data;
                setModels(models);

                const thumbnailPromises = models.map(async (model) => {
                    const thumbnailResponse = await axios.get(`http://127.0.0.1:5000/get_thumbnail/${model.replace('.glb', '.png')}`, {
                        responseType: 'blob',
                    });
                    const thumbnailUrl = URL.createObjectURL(thumbnailResponse.data);
                    return { [model]: thumbnailUrl };
                });

                const thumbnails = await Promise.all(thumbnailPromises);
                setThumbnails(Object.assign({}, ...thumbnails));
            } catch (err) {
                setError('Fehler beim Abrufen der Modellliste oder Thumbnails');
                console.error(err);
            }
        };

        fetchModels();
    }, []);

    const fetchModel = async (filename) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://127.0.0.1:5000/get_model/${filename}`, {
                responseType: 'blob',
            });

            const url = URL.createObjectURL(response.data);
            setModelUrl(url);
            setSelectedModel(filename);
            setLoading(false);
        } catch (err) {
            setError('Fehler beim Abrufen des Modells');
            console.error(err);
            setLoading(false);
        }
    };

    const getBaseName = (filename) => {
        return filename.replace('.glb', '');
    };

    return (
        <Container className="mt-5">

            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="justify-content-center">
                <Col md={8}>
                    {loading && (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Laden...</span>
                            </Spinner>
                        </div>
                    )}
                    {modelUrl && (
                        <div style={{ height: '400px', overflow: 'hidden' }}>
                            <Canvas style={{ height: '100%' }}>
                                <ambientLight />
                                <pointLight position={[10, 10, 10]} />
                                <Model url={modelUrl} />
                                <OrbitControls />
                            </Canvas>
                        </div>
                    )}
                </Col>
                <Col md={4} className="d-flex flex-column align-items-center">
                    <h2>Kleidungsstücke</h2>
                    {models.map((model, index) => (
                        <div key={index} className="d-flex flex-column align-items-center m-2" style={{ width: '120px' }}>
                            {thumbnails[model] && (
                                <Image
                                    src={thumbnails[model]}
                                    alt={getBaseName(model)}
                                    thumbnail
                                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                                    onClick={() => fetchModel(model)}
                                />
                            )}
                            <Button
                                onClick={() => fetchModel(model)}
                                className="mt-2"
                                variant={model === selectedModel ? 'primary' : 'secondary'}
                                size="sm"
                                block
                            >
                                {getBaseName(model)}
                            </Button>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default ModelViewer;
