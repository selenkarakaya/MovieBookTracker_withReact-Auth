import { PiBooks } from "react-icons/pi";
import { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import RatingReview from "./RatingReview";

function BookForm({ bookEdit, fetchBooks }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [rating1, setRating1] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [showToggle, setShowToggle] = useState(false);
  const [card, setCard] = useState();

  useEffect(() => {
    if (bookEdit.edit === true) {
      console.log(bookEdit.edit);
      setText(bookEdit.item.data.text);
      setDate(bookEdit.item.data.date);
      setComment(bookEdit.item.data.comment);
      setShowToggle(!showToggle);
    }
    // eslint-disable-next-line
  }, [bookEdit]);

  const handleChange = (e) => {
    if (e.target.id === "text") {
      setText(e.target.value);
    } else if (e.target.id === "date") {
      setDate(e.target.value);
    } else if (e.target.id === "comment") {
      setComment(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text !== "" && date !== "" && rating !== "") {
      const newBook = { text, date, rating, comment };
      // eslint-disable-next-line
      if (bookEdit.edit === true) {
        const docRef = doc(db, "books", bookEdit.item.id);
        await updateDoc(docRef, newBook);
      } else {
        // eslint-disable-next-line
        const docRef = await addDoc(collection(db, "books"), newBook);
      }
      fetchBooks();
      setShowToggle(!showToggle);
      setText("");
      setDate("");
      setComment("");

      setMessages(` ${text} was added successfully 🥳`);
      setTimeout(() => {
        setMessages(null);
      }, 2000);
    } else {
      setMessage("Please, fill the blank 🥲");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  const openForm = () => {
    setCard("card");
    setShowToggle(!showToggle);
  };
  return (
    <>
      {messages && <div className="message">{messages}</div>}
      <div className="my-5 d-flex justify-content-center">
        <button className="btn box" onClick={openForm}>
          <PiBooks style={{ color: "darkorchid" }} />
          Add Your Books
        </button>
      </div>
      {showToggle && (
        <form className={{ card }} onSubmit={handleSubmit}>
          <input
            value={text}
            id="text"
            onChange={handleChange}
            type="text"
            placeholder="title of movie"
          ></input>
          <input
            value={date}
            id="date"
            onChange={handleChange}
            type="text"
            placeholder="date"
          ></input>
          <RatingReview
            rating1={rating1}
            setRating1={setRating1}
            select={(rating) => setRating(rating)}
          />
          <textarea
            value={comment}
            id="comment"
            onChange={handleChange}
            name="postContent"
            placeholder="add comment!!"
            rows={4}
            cols={40}
          />
          <div className="button-groups my-3">
            <button className="btn btn-add" type="submit">
              Add book
            </button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      )}
    </>
  );
}

export default BookForm;
