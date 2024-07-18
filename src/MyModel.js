import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import axios from 'axios';
import { Container, Alert, Spinner } from 'react-bootstrap';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={0.5} />;
}

const MyModel = () => {
    const [modelUrl, setModelUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModel = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/humanmodel', {
                    responseType: 'blob',
                });

                const url = URL.createObjectURL(response.data);
                setModelUrl(url);
                setLoading(false);
            } catch (err) {
                setError('Fehler beim Abrufen des Modells');
                console.error(err);
                setLoading(false);
            }
        };

        fetchModel();
    }, []);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Mein Avatar</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Laden...</span>
                    </Spinner>
                </div>
            ) : (
                modelUrl && (
                    <Canvas style={{ height: '600px' }}>
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <Model url={modelUrl} />
                        <OrbitControls />
                    </Canvas>
                )
            )}
        </Container>
    );
};

export default MyModel;
