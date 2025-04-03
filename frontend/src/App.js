import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './components/Dashboard';
import Resoluciones from './views/Resoluciones';
import DatosExtraidos from './views/DatosExtraidos';
import Historial from './views/Historial';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resoluciones" element={<Resoluciones />} />
          <Route path="/datos-extraidos" element={<DatosExtraidos />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App; 