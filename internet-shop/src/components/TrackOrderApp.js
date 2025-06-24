import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TrackOrderApp.css';

const statuses = [
  'Замовлення прийнято',
  'Упаковується',
  'Передано в доставку',
  'В дорозі',
  'Доставлено'
];

const TrackOrderApp = ({ trackCode }) => {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    setStatusIndex(0);
    if (trackCode) {
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        if (idx < statuses.length) {
          setStatusIndex(idx);
        } else {
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [trackCode]);

  return (
    <div className="track-app-container">
      <div style={{ textAlign: 'right', marginBottom: 10 }}>
        <Link to="/cabinet" className="track-cabinet-btn">До кабінету</Link>
      </div>
      <h2>Відстеження посилки</h2>
      <div className="track-code">Трек-код: <strong>{trackCode}</strong></div>
      <ul className="track-status-list">
        {statuses.map((status, idx) => (
          <li key={status} className={idx <= statusIndex ? 'active-status' : ''}>{status}</li>
        ))}
      </ul>
      {statusIndex === statuses.length - 1 && <div className="delivered">Посилка доставлена!</div>}
    </div>
  );
};

export default TrackOrderApp; 