import React from 'react';
import './Header.css';

const Header = () => {
  const handleCatalogClick = () => {
    window.location.href = '/catalog'; // Перехід до сторінки каталогу
  };

  return (
    <header className="header">
      <h1>Ласкаво просимо до нашого інтернет-магазину!</h1>
      <p>Тут ви знайдете найкращі товари за найкращими цінами.</p>
      <button className="catalog-button" onClick={handleCatalogClick}>Перейти до каталогу</button>
    </header>
  );
};

export default Header; 