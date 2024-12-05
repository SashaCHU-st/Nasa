import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Используем useLocation
import './Card.css';
import axios from 'axios';

const Card = ({ data = [] }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Для получения состояния поиска
  const url = process.env.BACKEND_URL; 
  const addFavHandler = async (item, event) => {
    event.preventDefault();

    const article = item.data[0]; // Получаем первый элемент данных статьи
    const image = item.links && item.links[0] ? item.links[0].href : null;

    if (!image) {
      console.error('No valid image found for item:', item);
      alert('Image is missing for this article.');
      return;
    }

    if (!article || !article.nasa_id) {
      alert('Invalid article. nasa_id not found.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!userId || !token) {
        alert('User not logged in. Please log in and try again.');
        return;
      }

      // Отправляем данные статьи на сервер
      const response = await axios.post(
        `${url}/api/articles/${userId}`,
     //   `http://localhost:5000/api/articles/${userId}`,
        {
          nasa_id: article.nasa_id,
          title: article.title,
          description: article.description,
          image: image
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Article added to favorites!');
    } catch (err) {
      alert(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div className="card">
      {data.map((item, index) => {
        return (
          <div key={index} className="cardWr">
            {/* Проверка на наличие title */}
            {item.data && item.data[0] && item.data[0].title ? (
              <h3>{item.data[0].title}</h3>
            ) : (
              <h3>Title not available</h3>
            )}

            {/* Проверка на наличие изображения */}
            {item.links && item.links[0] && item.links[0].href ? (
              <img
                src={item.links[0].href}
                alt={item.data[0]?.title || "Image"}
                width="200"
              />
            ) : (
              <p>No image available</p>
            )}

            {/* Кнопка для перехода на страницу деталей */}
            <button
              onClick={() =>
                navigate("/detail", {
                  state: {
                    title: item.data[0]?.title,
                    links: item.links,
                    description: item.data[0]?.description,
                    query: location.state?.query, // Сохраняем query состояния
                    searchTriggered: location.state?.searchTriggered // Сохраняем состояние поиска
                  },
                })
              }
            >
              More Details
            </button>

            {/* Кнопка для добавления в избранное */}
            <button onClick={(event) => addFavHandler(item, event)}>
              Add to mine favorite
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
