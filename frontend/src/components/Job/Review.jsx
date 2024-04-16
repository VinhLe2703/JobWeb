import React, { useEffect, useState } from "react";
import axios from "axios";

const Review = ({ jobId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/reviews/${jobId}`)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [jobId]);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id}>
          <h4>{review.user.username}</h4>
          <p>{review.comment}</p>
          <p>{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
