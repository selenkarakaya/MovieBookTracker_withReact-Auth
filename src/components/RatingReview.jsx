function RatingReview({ rating1, setRating1, select }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className="start"
            key={star}
            style={{
              cursor: "pointer",
              color: rating1 >= star ? "gold" : "gray",
              fontSize: `45px`,
            }}
            onClick={() => {
              select(+star);
              setRating1(star);
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default RatingReview;
