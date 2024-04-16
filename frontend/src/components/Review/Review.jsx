// Review.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const Review = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);
  const { user } = useContext(Context);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await axios.get(`http://localhost:3000/api/v1/review/${id}`, {
      withCredentials: true,
    });
    setReviews(res.data.reviews);
  };

  const handleAdd = async () => {
    // Check if the user has already commented
    if (reviews.some(review => review.user._id === user._id)) {
      alert("You have already commented on this job.");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/v1/review/${id}`, {
        comment,
      }, {
        withCredentials: true,
      });
      setComment("");
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (reviewId, comment) => {
    setEditId(reviewId);
    setComment(comment);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/review/${editId}`, {
        comment,
      }, {
        withCredentials: true,
      });
      setComment("");
      setEditId(null);
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/review/${reviewId}`, {
        withCredentials: true,
      });
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="reviewSection">
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className="review">
          <p>
            User: <span>{review.user.username}</span>
          </p>
          <p>
            Comment: <span>{review.comment}</span>
          </p>
          <p>
            Created At: <span>{new Date(review.createdAt).toLocaleString()}</span>
          </p>
          {user && user._id === review.user._id && editId !== review._id && (
            <>
              <button onClick={() => handleEdit(review._id, review.comment)}>Edit</button>
              <button onClick={() => handleDelete(review._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      <div className="addReview">
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a review..."></textarea>
        <button onClick={editId ? handleUpdate : handleAdd}>{editId ? "Update" : "Add"}</button>
      </div>
    </section>
  );
};

export default Review;