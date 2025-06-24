import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UserCabinet.css';
import TrackOrderApp from './TrackOrderApp';

// Тестові замовлення
const testOrders = [
  {
    id: 'ORD-001',
    date: '2024-06-01',
    items: [
      { name: 'Смартфон', price: 8999, quantity: 1 },
      { name: 'Навушники', price: 1299, quantity: 1 },
    ],
    status: 'В дорозі',
    trackCode: 'TRK123456',
  },
  {
    id: 'ORD-002',
    date: '2024-06-03',
    items: [
      { name: 'Книга "React для початківців"', price: 450, quantity: 2 },
    ],
    status: 'Доставлено',
    trackCode: 'TRK654321',
  },
];

const UserCabinet = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Підтягуємо замовлення з localStorage + тестові
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders([...stored, ...testOrders]);
  }, []);

  return (
    <div className="cabinet-container">
      <header className="header">
        <div className="logo">Інтернет-Магазин</div>
        <nav className="nav-menu">
          <Link to="/home" className={location.pathname === '/home' ? 'active-link' : ''}>Головна</Link>
          <Link to="/catalog" className={location.pathname === '/catalog' ? 'active-link' : ''}>Каталог</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active-link' : ''}>Про нас</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>Контакти</Link>
          <Link to="/cabinet" className={location.pathname === '/cabinet' ? 'active-link' : ''}>Кабінет</Link>
        </nav>
      </header>
      <h1>Мій кабінет</h1>
      <h2>Мої замовлення</h2>
      <div className="orders-list">
        {orders.length === 0 && <div>У вас ще немає замовлень.</div>}
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span><strong>№</strong> {order.id}</span>
              <span>{order.date}</span>
              <span className={order.status === 'Доставлено' ? 'delivered' : 'in-progress'}>{order.status}</span>
            </div>
            <ul className="order-items">
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} — {item.price} грн × {item.quantity}</li>
              ))}
            </ul>
            <div className="order-actions">
              <button onClick={() => setSelectedTrack(order.trackCode)} className="track-btn">Відстежити посилку</button>
            </div>
          </div>
        ))}
      </div>
      {selectedTrack && (
        <div className="track-modal-bg" onClick={() => setSelectedTrack(null)}>
          <div className="track-modal" onClick={e => e.stopPropagation()}>
            <TrackOrderApp trackCode={selectedTrack} />
            <button className="close-track" onClick={() => setSelectedTrack(null)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCabinet; 