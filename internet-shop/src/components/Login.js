import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = '123456';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === TEST_EMAIL && form.password === TEST_PASSWORD) {
      setMessage('Ви увійшли!');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } else {
      setMessage('Невірний email або пароль. Спробуйте ще раз.');
    }
  };

  return (
    <div className="login-container">
      <h2>Вхід</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email (test@example.com)"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль (123456)"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Увійти</button>
      </form>
      {message && (
        <div className={message === 'Ви увійшли!' ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login; 