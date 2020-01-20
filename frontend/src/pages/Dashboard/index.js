import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import socketio from "socket.io-client";

import "./style.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);
  const user_id = localStorage.getItem("userId");

  const socket = useMemo(
    () =>
      socketio("http://localhost:3333/", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

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

  async function handleAccept(id) {
    await api.post(`/booking/${id}/approval`);

    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/booking/${id}/rejection`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva
              em <strong>{request.spot.company}</strong> para a data{" "}
              <strong>{request.date}</strong>
            </p>
            <button
              className="accept"
              onClick={() => handleAccept(request._id)}
            >
              ACEITAR
            </button>
            <button
              className="reject"
              onClick={() => handleReject(request._id)}
            >
              REJEITAR
            </button>
          </li>
        ))}
      </ul>
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
          <strong>NENHUM SPOT CADASTRADO</strong>
        )}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}