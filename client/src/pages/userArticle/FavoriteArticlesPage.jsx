import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FavoriteArticlePage.css"; // Import CSS for styling

const FavoriteArticlesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { articles } = location.state || { articles: [] }; // Extract articles from state

  return (
    <div className="favorites">
      <h1>Favorite Articles</h1>
      {articles && articles.length > 0 ? (
        <div className="card">
          {articles.map((article, index) => (
            <div className="cardWr" key={index}>
              <h3>{article.title || "Untitled Article"}</h3>
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title || "Image"}
                  width="200"
                  className="card-image"
                />
              ) : (
                <p>No image available</p>
              )}

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
