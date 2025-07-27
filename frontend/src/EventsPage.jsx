// src/components/EventsPage.js
import React, { useState, useEffect } from "react";
import "./EventsPage.css";

const EventsPage = () => {
  const eventDate = new Date("2025-02-26T00:00:00"); // Set event date
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const difference = eventDate - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <div className="event-card">
        <h2>Libathon 2025</h2>
        <p className="event-date">Date: February 26, 2025</p>
        <p className="event-description">
          Join us for a 24-hour reading marathon! Participate in exciting book
          discussions, author interactions, and book giveaways.
        </p>
        <div className="countdown">
          <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> :
          <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span>
        </div>
        <button className="register-btn">Register Now</button>
      </div>

      <div className="event-card">
        <h2>Libathon 2025</h2>
        <p className="event-date">Date: February 26, 2025</p>
        <p className="event-description">
          Join us for a 24-hour reading marathon! Participate in exciting book
          discussions, author interactions, and book giveaways.
        </p>
        <div className="countdown">
          <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> :
          <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span>
        </div>
        <button className="register-btn">Register Now</button>
      </div>

      <div className="event-card">
        <h2>Libathon 2025</h2>
        <p className="event-date">Date: February 26, 2025</p>
        <p className="event-description">
          Join us for a 24-hour reading marathon! Participate in exciting book
          discussions, author interactions, and book giveaways.
        </p>
        <div className="countdown">
          <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> :
          <span>{timeLeft.minutes}m</span> : <span>{timeLeft.seconds}s</span>
        </div>
        <button className="register-btn">Register Now</button>
      </div>
    </div>
  );
};

export default EventsPage;
