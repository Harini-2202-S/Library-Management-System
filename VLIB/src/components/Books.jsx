import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const userId = 1; // Replace with the logged-in user's ID

  // Fetch books from the API
  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Fetch the wishlist from the API when the component mounts
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_wishlist/${userId}`)
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, [userId]);

  // Add or remove book from wishlist
  const addToWishlist = (book) => {
    const isInWishlist = wishlist.some((b) => b.isbn13 === book.isbn13);
    const method = isInWishlist ? "DELETE" : "POST"; // Use DELETE for removal

    fetch("http://127.0.0.1:5000/add_to_wishlist", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        isbn13: book.isbn13,
        title: book.title,
        subtitle: book.subtitle,
        authors: book.authors,
        categories: book.categories,
        thumbnail: book.thumbnail,
        description: book.description,
        published_year: book.published_year,
        average_rating: book.average_rating,
        num_pages: book.num_pages,
        ratings_count: book.ratings_count,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (method === "POST") {
          setWishlist((prevWishlist) => [...prevWishlist, book]);
        } else {
          setWishlist((prevWishlist) =>
            prevWishlist.filter((b) => b.isbn13 !== book.isbn13)
          );
        }
      })
      .catch((error) => console.error("Error adding/removing from wishlist:", error));
  };

  return (
    <div className="books-page">
      <h2 className="page-title">Library Collection</h2>
      <div className="cards">
        {books.map((book) => (
          <div key={book.isbn13} className="card">
            <div
              className="card__img"
              style={{
                backgroundImage: `url(${book.thumbnail || "default-image.jpg"})`, // Fallback to default image if thumbnail is missing
              }}
            ></div>
            <div className="card__img--hover" style={{ backgroundImage: `url(${book.thumbnail || "default-image.jpg"})` }}></div>
            <div className="card__info">
              <h3 className="card__title">{book.title}</h3>
              <p className="card__category">{book.categories}</p>
              <p className="card__by">
                By <span className="card__author">{book.authors}</span>
              </p>
              <Link to={`/book/${book.title}`} className="details-btn">
                View Details
              </Link>
              <button
                className={`wishlist-btn ${wishlist.some((b) => b.isbn13 === book.isbn13) ? "added" : ""}`}
                onClick={() => addToWishlist(book)}
              >
                {wishlist.some((b) => b.isbn13 === book.isbn13) ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="page-title">Your Wishlist</h2>
      <div className="cards">
        {wishlist.map((book) => (
          <div key={book.isbn13} className="card">
            <div
              className="card__img"
              style={{
                backgroundImage: `url(${book.thumbnail || "default-image.jpg"})`, // Fallback to default image if thumbnail is missing
              }}
            ></div>
            <div className="card__img--hover" style={{ backgroundImage: `url(${book.thumbnail || "default-image.jpg"})` }}></div>
            <div className="card__info">
              <h3 className="card__title">{book.title}</h3>
              <p className="card__category">{book.categories}</p>
              <p className="card__by">
                By <span className="card__author">{book.authors}</span>
              </p>
              <Link to={`/book/${book.title}`} className="details-btn">
                View Details
              </Link>
              <button
                className="wishlist-btn added"
                onClick={() => addToWishlist(book)}
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
