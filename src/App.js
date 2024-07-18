import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navbar';
import Home from './Home';
import MyMeasurements from './MyMeasurements';
import MyModel from './MyModel';
import TryOn from './TryOn';
import MyData from "./MyData";
import ModelViewer from './ModelViewer';

const App = () => {
    return (
        <Router>
            <Navigation />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-measurements" element={<MyMeasurements />} />
                    <Route path="/my-model" element={<MyModel />} />
                    <Route path="/try-on" element={<TryOn />} />
                    <Route path="/my-data" element={<MyData />} />
                    <Route path="/model-viewer" element={<ModelViewer />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
