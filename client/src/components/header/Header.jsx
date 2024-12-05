import React from 'react';
import './Header.css';

const Header = ({ fetchAPIData, query, setQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    fetchAPIData(); // Вызываем поиск
  };

  return (
    <div className="header">
      <h1>Search</h1>
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Start to write for example moon etc..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
