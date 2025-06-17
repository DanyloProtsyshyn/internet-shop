import React from 'react';
import './Catalog.css';

const Catalog = () => {
  const products = [
    { id: 1, name: 'Товар 1', price: 100 },
    { id: 2, name: 'Товар 2', price: 200 },
    { id: 3, name: 'Товар 3', price: 300 },
  ];

  return (
    <div className="catalog">
      <h2>Каталог товарів</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Ціна: {product.price} грн</p>
            <button className="buy-button">Купити</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog; 