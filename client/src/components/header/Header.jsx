import React from 'react';
import './Header.css';

const Header = ({ fetchAPIData, query, setQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Останавливаем стандартное поведение формы
    fetchAPIData(); // Вызываем функцию для запроса данных
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
            onChange={(e) => setQuery(e.target.value)} // Обновляем строку поиска
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
