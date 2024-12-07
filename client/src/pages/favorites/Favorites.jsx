import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Favorites.css';
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const url = process.env.REACT_APP_BACKEND_URL;

  // Fetch favorite articles from the API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          setError('Please log in to view favorites.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${url}/api/articles/${userId}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data.favorites);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array to run once 

  const removeFavoriteHandler = async (articleId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setError('Please log in to remove favorites.');
        return;
      }

      await axios.delete(`${url}/api/articles/${userId}/favorites/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites((prevFavorites) => prevFavorites.filter((article) => article._id !== articleId));
      alert('Removed from favorites');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    }
  };
  return (
    <div className="favorites">
      {loading && <LoadingSpinner asOverlay />}
      {error && <p className="error">{error}</p>}
      {favorites.length === 0 && !error ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="card">
          {favorites.map((article) => {
            return (
              <div className="cardWr" key={article._id}>
                <h3>{article.title || 'Untitled Article'}</h3>
                {article.image ? (
                  <img
                    src={article.image} 
                    alt={article.title || 'Image'} 
                    // width="200" 
                  />
                ) : (
                  <p>No image available</p> 
                )}

                <button
                  onClick={() =>
                    navigate('/detail', {
                      state: {
                        title: article.title,
                        image: article.image,  
                        description: article.description || 'No description available.',
                      },
                    })
                  }
                >
                  More Details
                </button>
                <button onClick={() => removeFavoriteHandler(article._id)}>
                  Remove from Favorites
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
