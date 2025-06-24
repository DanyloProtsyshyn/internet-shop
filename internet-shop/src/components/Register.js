import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Тут можна додати логіку для відправки даних на сервер
  };

  return (
    <div className="register-container">
      <h2>Реєстрація</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ім'я"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>
      {submitted && <div className="success-message">Ви успішно зареєстровані!</div>}
    </div>
  );
};

export default Register; 