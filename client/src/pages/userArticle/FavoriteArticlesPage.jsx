import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./FavoriteArticlesPage.css"; // Import CSS for styling

const FavoriteArticlesPage = () => {
  const location = useLocation();
  const { userId } = location.state || { userId: null }; // Extract userId from state
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get(`https://nasa-79xl.onrender.com/api/articles/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data.favorites);
      } catch (err) {
        setError("Failed to fetch favorite articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="favorites-page">
      <h1>Favorite Articles</h1>
      {articles.length > 0 ? (
        <div className="articles-container">
          {articles.map((article, index) => (
            <div className="article-box" key={index}>
              <h2>{article.title}</h2>
              <img src={article.image} alt={article.title} className="article-image" />
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite articles to display</p>
      )}
    </div>
  );
};

export default FavoriteArticlesPage;