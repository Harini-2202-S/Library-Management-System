import React from "react";
import Header from "./components/Header";
import "./Dashboard.css"
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

import { useRef, useState,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-cards';
import "./components/slider.css"


const Dashboard = () => {

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books") 
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm === "") {
      setFilteredBooks([]);
    } else {
      const matches = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm)
      );
      setFilteredBooks(matches);
    }
  };
  
  const announcements = [
    {
      id: 1,
      title: "Library Closed for Maintenance",
      description: "The library will be closed on March 10th for scheduled maintenance.",
      date: "Feb 20, 2025",
      type: "Important",
    },
    {
      id: 2,
      title: "New Books Added!",
      description: "Check out the latest arrivals in fiction and non-fiction sections.",
      date: "Feb 18, 2025",
      type: "Update",
    },
    {
      id: 3,
      title: "Author Meet & Greet Event",
      description: "Join us for an interactive session with bestselling author John Doe.",
      date: "Feb 25, 2025",
      type: "Event",
    },
  ];
  return (
    <div>
      <div className="dashboard">
        <div className="hero">
          <div className="herotext">
            <h2>
              Welcome,User
            </h2>
            <p>Explore a vast collection of books, track your borrowed and reserved titles, and stay updated with the latest library announcements. Manage your reading journey effortlessly with your personalized dashboard, featuring your book history, wishlist, and more. Dive into knowledge and make the most of your library experience!</p>
            <input
              type="text"
              placeholder="  Search for books..."
              value={query}
              onChange={handleSearch}
              className="search-input"
            />
            {query && filteredBooks.length > 0 && (
            <ul className="suggestions">
              {filteredBooks.map((book) => (
                <li key={book.id} className="suggestion-item">
                  <span>{book.title}</span>
                </li>
              ))}
            </ul>
            )}
          </div>
          
          <div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            modules={[Autoplay, EffectCoverflow]}
            className="mySwiper"
            slidesPerView={3} 
            centeredSlides={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
          >
            {books.map((book) => (
              <SwiperSlide key={book.id} className="book-slide">
                <img src={book.thumbnail} alt={book.title} className="book-cover" />
                <div className="book-details">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>

        

        <div className="Suggestions">
          <div className="suggested-section">
            <h2>Suggested for You</h2>
            <div className="book-card-container">
              {books.slice(0, 5).map((book) => (
                <Link key={book.id} to={`/book/${encodeURIComponent(book.title)}`} className="book-card-link">
                  <div className="book-card">
                    <img src={book.thumbnail} alt={book.title} className="book-cover" />
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>


        <div className="user-profile">
          <h2>Your Profile</h2>
          <div className="usercard-container">
            <div className="usercard">
              <h3>Borrowed Books</h3>
              <p>62</p>
            </div>
            <div className="usercard">
              <h3>Currently Using</h3>
              <p>3</p>
            </div>
            <div className="usercard">
              <h3>Due Fine</h3>
              <p>₹120</p> 
            </div>
          </div>
        </div>

        <div className="announcement-section">
          <h2 className="announcement-title"> Announcements</h2>
          <div className="announcement-container">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`announcement-card ${announcement.type.toLowerCase()}`}
                >
                  <div className="announcement-header">
                    <span className="announcement-type">{announcement.type}</span>
                    <span className="announcement-date">{announcement.date}</span>
                  </div>
                  <h3 className="announcement-heading">{announcement.title}</h3>
                  <p className="announcement-text">{announcement.description}</p>
                </div>
              ))
            ) : (
              <p className="no-announcements">No announcements available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
