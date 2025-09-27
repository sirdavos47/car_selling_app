import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import Login from './components/Login';
import Register from './components/Register';
import MessagePage from './components/MessagePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages/:carId" element={<MessagePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
