import { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import RatingReview from "./RatingReview";
import { PiBooks } from "react-icons/pi";

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

  const auth = getAuth();

  useEffect(() => {
    if (bookEdit.edit === true) {
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

      if (bookEdit.edit === true) {
        const docRef = doc(db, "books", bookEdit.item.id);
        if (auth.currentUser) {
          await updateDoc(docRef, {
            ...newBook,
            userRef: auth.currentUser.uid,
          });
          toast(`📖 ${text} was updated successfully 🥳!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast(`📖 ${text} was updated successfully 🥳!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          await updateDoc(docRef, newBook);
        }
      } else {
        if (auth.currentUser) {
          toast(`📖 ${text} was added successfully 🥳!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          await addDoc(collection(db, "books"), {
            ...newBook,
            userRef: auth.currentUser.uid,
          });
        } else {
          toast(`📖 ${text} was added successfully 🥳!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          await addDoc(collection(db, "books"), newBook);
        }
      }
      fetchBooks();
      setShowToggle(!showToggle);
      setText("");
      setDate("");
      setComment("");

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
