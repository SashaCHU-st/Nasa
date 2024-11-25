import React from "react";
import { useNavigate } from "react-router-dom";
import './Card.css'

const Card = ({ data = [] }) => {
  const navigate = useNavigate();// используем для навигации на другую страницу

  return (
    <div className="card">
       {/* data.map берется из данных которые предоставило API
       т.е когда делается запрос в DevTools можно посмотреть какая структура была дана для каждого обьекта
       в данном случае была было указано item и индекс означает определенный номер обьекта
       data мы выслали данные котороые получили. Data была пустой но мы SetData и дали парметры которые выдыло на DevTool
       collection  */}
      {data.map((item, index) => (
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
        </div>
      ))}
    </div>
  );
};

export default Card;
