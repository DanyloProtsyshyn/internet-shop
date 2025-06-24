import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Стан для відстеження товарів у кошику
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // При завантаженні сторінки підтягуємо кошик з localStorage
    const stored = localStorage.getItem('cartItems');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    // Оновлюємо localStorage при зміні кошика
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Каталог товарів
  const products = [
    { id: 1, name: 'Смартфон', price: 8999, category: 'Електроніка' },
    { id: 2, name: 'Футболка', price: 399, category: 'Одяг' },
    { id: 3, name: 'Книга "React для початківців"', price: 450, category: 'Книги' },
    { id: 4, name: 'Навушники', price: 1299, category: 'Електроніка' },
  ];

  // Додавання товару в кошик
  const addToCart = (product) => {
    setCartItems([...cartItems, {...product, quantity: 1}]);
  };

  // Видалення товару з кошика
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Розрахунок загальної суми
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCartClick = () => setShowCart((prev) => !prev);
  const handleCloseCart = () => setShowCart(false);

  return (
    <div className="app-container">
      {/* Шапка сайту */}
      <header className="header">
        <div className="logo">Інтернет-Магазин</div>
        <nav className="nav-menu">
          <Link to="/home" className={location.pathname === '/home' ? 'active-link' : ''}>Головна</Link>
          <Link to="/catalog" className={location.pathname === '/catalog' ? 'active-link' : ''}>Каталог</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active-link' : ''}>Про нас</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>Контакти</Link>
          <Link to="/cabinet" className={location.pathname === '/cabinet' ? 'active-link' : ''}>Кабінет</Link>
        </nav>
        <div className="cart-icon" onClick={handleCartClick} tabIndex={0} title="Відкрити кошик" role="button">
          🛒 <span className="cart-count">{cartItems.length}</span>
        </div>
      </header>

      {/* Головний банер */}
      <div className="hero-banner">
        <h1>Вітаємо в інтернет-магазині!</h1>
        <p>Обирайте найкращі товари за вигідними цінами</p>
        <Link to="/catalog" className="cta-button">Перейти до каталогу</Link>
      </div>

      {/* Категорії товарів */}
      <section className="categories">
        <h2>Популярні категорії</h2>
        <div className="category-list">
          <div className="category-card">Електроніка</div>
          <div className="category-card">Одяг</div>
          <div className="category-card">Книги</div>
          <div className="category-card">Побутова техніка</div>
        </div>
      </section>

      {/* Рекомендовані товари */}
      <section className="featured-products">
        <h2>Рекомендовані товари</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="placeholder-image" />
              </div>
              <h3>{product.name}</h3>
              <p className="price">{product.price} грн</p>
              <button onClick={() => addToCart(product)} className="add-to-cart">
                Додати в кошик
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Кошик (модальне вікно) */}
      {showCart && (
        <div className="cart-modal">
          <button style={{float: 'right', background: 'none', border: 'none', fontSize: '1.3rem', color: '#888', cursor: 'pointer'}} onClick={handleCloseCart} title="Закрити">×</button>
          <h3>Ваш кошик</h3>
          {cartItems.length === 0 ? (
            <p>Кошик порожній</p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <span>{item.price} грн × {item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)}>×</button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Загальна сума:</strong> {totalAmount} грн
              </div>
              <Link to="/checkout" className="checkout-button" onClick={handleCloseCart}>
                Оформити замовлення
              </Link>
            </>
          )}
        </div>
      )}

      {/* Футер */}
      <footer className="footer">
        <div className="footer-section">
          <h4>Контакти</h4>
          <p>+380 123 456 789</p>
          <p>shop@example.com</p>
        </div>
        <div className="footer-section">
          <h4>Час роботи</h4>
          <p>Пн-Нд: 09:00 - 21:00</p>
        </div>
        <div className="footer-section">
          <h4>Соціальні мережі</h4>
          <div className="social-icons">
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">TW</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;