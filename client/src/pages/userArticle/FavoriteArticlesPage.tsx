import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import "./FavoriteArticlesPage.css"; 
import ErrorModal from "../../components/error_component/ErrorModal";

interface Article
{
  title:string;
  image:string;
}

const FavoriteArticlesPage = () => {
  const location = useLocation();
  const { userId } = location.state || { userId: null }; // Extract userId from state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token"); //
        const response = await axios.get(`${url}/api/articles/favorites/${userId}`, {
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

  return (
    <div className="favorites-page">
      {loading && <LoadingSpinner asOverlay />}
      {error && <ErrorModal error={error} onClear={() => setError("")} />}
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
        <p className="not_found">No favorite articles to display</p>
      )}
    </div>
  );
};

export default FavoriteArticlesPage;