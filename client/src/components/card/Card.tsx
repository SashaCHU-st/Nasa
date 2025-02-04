import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Card.css";
import axios from "axios"; //!!!!! axios lbararu to send http req

interface Cardprops {
  data: NasaItem[];
}

interface NasaItem {
  data: {
    nasa_id: string;
    title: string;
    description?: string;
  }[];
  links?: { href: string }[];
}

const Card: React.FC<Cardprops> = ({ data = [] }) => {
  // data has been sent from search
  const navigate = useNavigate();
  const location = useLocation(); //info about current url and state
  const url = process.env.REACT_APP_BACKEND_URL;
  const addFavHandler = async (
    item: NasaItem,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // needed to prevent behavior from the browser

    const article = item.data[0]; // get data form api that gets from devtools
    const image = item.links?.[0]?.href || null; // get image, image is under data so need separate

    /// just in case
    if (!image) {
      alert("Image is missing for this article.");
      return;
    }

    if (!article || !article.nasa_id) {
      alert("Invalid article");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      /// for adding to my favorite from another users
      if (!userId || !token) {
        alert("User not logged in. Please log in and try again.");
        return;
      }

      // sending to server req
      const response = await axios.post(
        // axios help send post req to server to add new article
        `${url}/api/articles/${userId}`,
        {
          nasa_id: article.nasa_id,
          title: article.title,
          description: article.description,
          image: image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Article added to favorites!");
    } catch (err: unknown) {
      // unkknown will handle error types from Axios, JS, unknown
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message || "Something went wrong");
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An  unknown error occured");
      }
    }
  };

  return (
    <div className="card">
      {/* 
       data.map taken from data that comes from API
       e.g when req is happening in DevTools can see which strcuture was given for each object
       in this case it was item and index means the index of this object
       that we received*/}
      {data.map((item, index) => {
        return (
          <div key={index} className="cardWr">
            {/* check if artcile exist if not default  */}
            {item.data && item.data[0] && item.data[0].title ? (
              <h3>{item.data[0].title}</h3>
            ) : (
              <h3>Title not available</h3>
            )}

            {/* if image exist */}
            {item.links && item.links[0] && item.links[0].href ? (
              <img
                src={item.links[0].href}
                alt={item.data[0]?.title || "Image"}
                width="200"
              />
            ) : (
              <p>No image available</p>
            )}

            {/* button to details*/}
            <button
              onClick={() =>
                navigate("/detail", {
                  state: {
                    title: item.data[0]?.title,
                    links: item.links,
                    description: item.data[0]?.description,
                    query: location.state?.query, // save query staet as it is
                    searchTriggered: location.state?.searchTriggered, // save state of the search, in case if back button
                  },
                })
              }
            >
              More Details
            </button>
            {/* add to fav */}
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
