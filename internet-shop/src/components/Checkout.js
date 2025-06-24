import React, { useState } from 'react';
import './Checkout.css';

const statuses = [
  'Замовлення прийнято',
  'Упаковується',
  'Передано в доставку',
  'В дорозі',
  'Доставлено'
];

function generateTrackCode() {
  return 'TRK' + Math.floor(100000 + Math.random() * 900000);
}

const Checkout = () => {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [trackCode, setTrackCode] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setStatusIndex(0);
    // Формуємо нове замовлення
    const newOrder = {
      id: 'ORD-' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
      status: statuses[0],
      trackCode: generateTrackCode(),
      user: form.name,
      address: form.address,
      phone: form.phone
    };
    setOrderId(newOrder.id);
    setTrackCode(newOrder.trackCode);
    // Зберігаємо у localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.unshift(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    // Очищаємо кошик
    localStorage.removeItem('cartItems');
  };

  // Симуляція зміни статусу доставки
  React.useEffect(() => {
    if (orderPlaced && statusIndex < statuses.length - 1) {
      const timer = setTimeout(() => setStatusIndex(statusIndex + 1), 2000);
      return () => clearTimeout(timer);
    }
    // Оновлюємо статус замовлення у localStorage
    if (orderPlaced && orderId) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const idx = orders.findIndex(o => o.id === orderId);
      if (idx !== -1) {
        orders[idx].status = statuses[statusIndex];
        localStorage.setItem('orders', JSON.stringify(orders));
      }
    }
  }, [orderPlaced, statusIndex, orderId]);

  return (
    <div className="checkout-container">
      <h1>Оформлення замовлення</h1>
      {!orderPlaced ? (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ваше ім'я"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Адреса доставки"
            value={form.address}
            onChange={handleChange}
            required
          />
          <button type="submit">Підтвердити замовлення</button>
        </form>
      ) : (
        <div className="order-status">
          <h2>Статус доставки</h2>
          <ul className="status-list">
            {statuses.map((status, idx) => (
              <li key={status} className={idx <= statusIndex ? 'active-status' : ''}>{status}</li>
            ))}
          </ul>
          {statusIndex === statuses.length - 1 && <div className="delivered">Ваше замовлення доставлено!</div>}
          <div style={{marginTop: 20}}>
            <strong>Трек-код:</strong> {trackCode}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout; 