import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const userId = 1;  // Replace with actual logged-in user's ID

    // Fetch wishlist for the user from the backend
    fetch(`https://library-management-system-5bjb.onrender.com/get_wishlist/${userId}`)
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  const removeFromWishlist = (isbn13) => {
    const userId = 1; // Replace with actual logged-in user's ID

    // Send a request to the backend to remove the book from the wishlist
    fetch(`https://library-management-system-5bjb.onrender.com/remove_from_wishlist/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isbn13 }),
    })
      .then((response) => response.json())
      .then(() => {
        // Update the wishlist in the frontend after removal
        setWishlist((prevWishlist) =>
          prevWishlist.filter((book) => book.isbn13 !== isbn13)
        );
      })
      .catch((error) => console.error("Error removing book from wishlist:", error));
  };

  return (
    <div className="wishlist-page">
      <h2 className="page-title">Your Wishlist</h2>
      <div className="wishlist-cards">
        {wishlist.map((book) => (
          <div key={book.isbn13} className="wishlist-card">
            <div
              className="wishlist-card__img"
              style={{ backgroundImage: `url(${book.thumbnail})` }}
            ></div>
            <div className="wishlist-card__info">
              <h3 className="wishlist-card__title">{book.title}</h3>
              <p className="wishlist-card__category">{book.categories}</p>
              <p className="wishlist-card__by">
                By <span className="wishlist-card__author">{book.authors}</span>
              </p>
              <Link to={`/book/${book.title}`} className="details-btn">
                View Details
              </Link>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(book.isbn13)}
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

export default Wishlist;
