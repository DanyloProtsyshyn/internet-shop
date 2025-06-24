import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Checkout from './components/Checkout';
import UserCabinet from './components/UserCabinet';

const RegisterWithLoginButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Register />
      <button
        style={{
          marginTop: 16,
          background: '#fff',
          color: '#ff6b6b',
          border: '1px solid #ff6b6b',
          borderRadius: 5,
          padding: '8px 20px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background 0.2s',
        }}
        onClick={() => navigate('/login')}
      >
        Перейти до входу
      </button>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterWithLoginButton />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/register" element={<RegisterWithLoginButton />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cabinet" element={<UserCabinet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
