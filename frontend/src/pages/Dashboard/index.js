import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./style.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("userId");
      const { data } = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.length > 0 ? (
          spots.map(spot => (
            <li key={spot._id}>
              <header
                style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
              ></header>
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
            </li>
          ))
        ) : (
          <strong>lista vazia</strong>
        )}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
