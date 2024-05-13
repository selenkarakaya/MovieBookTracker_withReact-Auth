import { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import RatingSelect from "./RatingSelect";
import { MdMovieFilter } from "react-icons/md";

function MoviesForm({ movieEdit, fetchMovies }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [showToggle, setShowToggle] = useState(false);
  const [card, setCard] = useState();

  const auth = getAuth();

  useEffect(() => {
    if (movieEdit.edit === true) {
      setText(movieEdit.item.data.text);
      setDate(movieEdit.item.data.date);
      setRating(movieEdit.item.data.rating);
      setComment(movieEdit.item.data.comment);
      setShowToggle(!showToggle);
    }
    // eslint-disable-next-line
  }, [movieEdit]);

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
    if (text !== "" && date !== "" && rating !== "" && comment !== "") {
      const newMovie = { text, date, rating, comment };

      if (movieEdit.edit === true) {
        const docRef = doc(db, "movies", movieEdit.item.id);
        if (auth.currentUser) {
          await updateDoc(docRef, {
            ...newMovie,
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
          await updateDoc(docRef, newMovie);
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
        }
      } else {
        if (auth.currentUser) {
          await addDoc(collection(db, "movies"), {
            ...newMovie,
            userRef: auth.currentUser.uid,
          });
          toast(`🍿 ${text} was added successfully 🥳!`, {
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
          await addDoc(collection(db, "movies"), {
            ...newMovie,
          });
          toast(`🍿 ${text} was added successfully 🥳!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
      fetchMovies();
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
          <MdMovieFilter style={{ color: "darkorchid" }} />
          Add Your Movies
        </button>
      </div>
      {showToggle && (
        <form className={{ card }} onSubmit={handleSubmit}>
          <input
            value={text}
            id="text"
            onChange={handleChange}
            type="text"
            placeholder="Title of Movie"
          ></input>

          <input
            value={date}
            id="date"
            onChange={handleChange}
            type="text"
            placeholder="When did you watch?"
          ></input>
          <RatingSelect
            select={(rating) => setRating(rating)}
            movieEdit={movieEdit}
          />
          <textarea
            value={comment}
            id="comment"
            onChange={handleChange}
            name="postContent"
            placeholder="add comment!"
            rows={4}
            cols={40}
          />
          <div className="button-groups my-3">
            <button type="submit" className="btn btn-add">
              Add movie
            </button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      )}
    </>
  );
}

export default MoviesForm;
