import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios to make API requests
import "./BookDetails.css";

const BookDetails = () => {
  const { title } = useParams(); // Getting the title from the URL
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(""); // State to store new comment input

  useEffect(() => {
    // Log the title to check if it's correct
    console.log("Title from URL:", title);

    // Fetch book details from the API using the title
    fetch(`https://library-management-system-5bjb.onrender.com/get_book_by_title/${encodeURIComponent(title)}`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched book data:", data); // Log the data to check what is returned
        setBookDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setError(error);
        setLoading(false);
      });

    // Fetch comments for the book
    fetch(`https://library-management-system-5bjb.onrender.com/get_comments/${encodeURIComponent(title)}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [title]);
  
  const handleAddComment = () => {
    if (!newComment) return; // Don't submit empty comments
  
    const commentData = {
      user_id: 1, // Assume user_id is 1 for now, replace with actual user ID
      title: bookDetails.title, // Send the title, not isbn13
      comment: newComment,
    };
  
    // Log the data to check
    console.log("Sending comment data:", commentData);
  
    // Send the new comment to the backend API
    axios
      .post("https://library-management-system-5bjb.onrender.com/add_comment", commentData)
      .then((response) => {
        setComments([...comments, { comment: newComment }]); // Add new comment to the list
        setNewComment(""); // Clear the input field
      })
      .catch((error) => console.error("Error adding comment:", error));
  };
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!bookDetails) {
    return <div>No details found for this book.</div>;
  }

  return (
    <div className="book-details-page">
      <h2><span className="coloredname">{bookDetails.title}</span></h2>
      <div className="book-details-content">
        <div className="image-section">
          <img src={bookDetails.thumbnail} alt={bookDetails.title} />
          <div className="book-info-below-image">
            <p><strong>Category:</strong> {bookDetails.categories}</p>
            <p><strong>Published Year:</strong> {bookDetails.published_year}</p>
            <p><strong>ISBN-13:</strong> {bookDetails.isbn13}</p>
            <p><strong>ISBN-10:</strong> {bookDetails.isbn10}</p>
          </div>
        </div>
        <div className="bookd-info">
          <h3>Authors: {bookDetails.authors}</h3>
          <p><strong>Description:</strong> {bookDetails.description}</p>
          <div className="rating">
            ⭐ <span>{bookDetails.average_rating}</span> ({bookDetails.ratings_count} reviews)
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        <div className="add-comment">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
