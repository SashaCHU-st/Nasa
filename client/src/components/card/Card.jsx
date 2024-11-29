import React from "react";
import { useNavigate } from "react-router-dom";
import './Card.css'
import axios from 'axios';

const Card = ({ data = [] }) => {
  const navigate = useNavigate(); // using navigate to navigate to another page

  const addFavHandler = async (item, event) => {
    event.preventDefault();

    const article = item.data[0];// Assuming the article is in the first element of the data array
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

      // Send all article data to the backend
      const response = await axios.post(
        `https://nasa-79xl.onrender.com/api/articles/${userId}`,
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
       {/* data.map берется из данных которые предоставило API
       т.е когда делается запрос в DevTools можно посмотреть какая структура была дана для каждого обьекта
       в данном случае была было указано item и индекс означает определенный номер обьекта
       data мы выслали данные котороые получили. Data была пустой но мы SetData и дали парметры которые выдыло на DevTool
       collection  */}
      {data.map((item, index) =>{
            console.log(item); // Log each item to the console
            console.log("JJJ",item.data[0]?.nasa_id); // Log nasa_id to the console
       return (
        
        <div key={index} className="cardWr">
          {/* если все ок существует data (параметры взяты из DevTools) */}
          {item.data && item.data[0] && item.data[0].title ? 
           (
            <h3>{item.data[0].title}</h3>
          ) : (
            <h3>Title not available</h3>
          )}
          {/* смотрим что выдает картинки в этом случае links*/}
          {item.links && item.links[0] && item.links[0].href ? (
            <img
              src={item.links[0].href}
              alt={item.data[0]?.title || "Image"}
              width="200"
            />
          ) : (
            <p>No image available</p>
          )}

{/* по ссылке переходим на другую страницу, и передает данные которые нам нужны в этой ссылке
title as..., links as..., description as ...*/}
          <button
            onClick={() =>
              navigate("/detail", {
                state: {
                  title: item.data[0]?.title,
                  links: item.links,
                  description: item.data[0]?.description,
                },
              })
            }
          >
            More Details
          </button>
          <button onClick={(event) => addFavHandler(item, event)}>
            Add to mine favorite
          </button>
          
        </div>
      )
      })}
    </div>
  );
};

export default Card;
