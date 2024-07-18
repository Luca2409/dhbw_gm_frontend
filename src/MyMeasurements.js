import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table, Container, Alert } from 'react-bootstrap';

const MyMeasurements = () => {
    const [measurements, setMeasurements] = useState(null);
    const [error, setError] = useState('');
    const [showButton, setShowButton] = useState(true);

    const fetchMeasurements = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/measurements');
            setMeasurements(response.data.measurements);
            setShowButton(false);
        } catch (err) {
            setError('Fehler beim Abrufen der Messdaten');
            console.error(err);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Meine Messungen</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {showButton ? (
                <div className="text-center">
                    <p>Rufe hier deine Messungen ab</p>
                    <Button variant="secondary" onClick={fetchMeasurements}>Get Measurements</Button>
                </div>
            ) : (
                measurements && (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Measurement</th>
                            <th>Value (mm)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Höhe in Pixel</td>
                            <td>{measurements[0].height_pixels}</td>
                        </tr>
                        <tr>
                            <td>Saumlinie</td>
                            <td>{measurements[0].hemline_mm.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Linke Ellbogenlinie</td>
                            <td>{measurements[0].left_elbow_line_mm.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Linke Schulterlinie</td>
                            <td>{measurements[0].left_shoulder_line_mm.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Halslinie</td>
                            <td>{measurements[0].neck_line_mm.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Rechte Ellbogenlinie</td>
                            <td>{measurements[0].right_elbow_line_mm.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Rechte Schulterlinie</td>
                            <td>{measurements[0].right_shoulder_line_mm.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Taille Linie</td>
                            <td>{measurements[0].waist_line_mm.toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </Table>
                )
            )}
        </Container>
    );
};

export default MyMeasurements;
