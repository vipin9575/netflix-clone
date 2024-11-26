import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
// import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTcyZTEyZDk5ZjY3ZTc5YzVmZjY3MWI3MGRkYTJlMCIsIm5iZiI6MTczMjQ2Njc0Ny4zMzU4MjM1LCJzdWIiOiI2NzQzNTZiZjFjZDhjMjQzZTZiZWI2NmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Q5L-6uXbAInhT7kNrvIJgkP2f8F02DsglwpRfbzLcbQ",
    },
  };

  const handleScroll = (event) => {
    event.preventDefault();
    const cards = cardsRef.current;
    cards.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;
    cards.addEventListener("wheel", handleScroll);
    return () => {
      cards.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
