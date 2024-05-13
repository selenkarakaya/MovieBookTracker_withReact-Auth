import MoviesItem from "./MoviesItem";
import MoviesForm from "./MoviesForm";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth } from "firebase/auth";

function MoviesList() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToggle, setShowToggle] = useState(false);
  const [movieEdit, setMovieEdit] = useState({ item: {}, edit: false });
  const auth = getAuth();
  var user = auth.currentUser;

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);
  const fetchMovies = async () => {
    try {
      // get refence
      const moviesRef = collection(db, "movies");
      const q = query(moviesRef, orderBy("text", "desc"));
      // Execute query
      const querySnap = await getDocs(q);
      const movies = [];
      querySnap.forEach((doc) => {
        if (user) {
          if (doc.data().userRef === auth.currentUser.uid) {
            return movies.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        } else if (doc.data().userRef === undefined) {
          return movies.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });
      setMovies(movies);
      setLoading(false);
    } catch (error) {}
  };
  const onDelete = async (itemId) => {
    await deleteDoc(doc(db, "movies", itemId));
    const updatedMovies = movies.filter((item) => item.id !== itemId);
    setMovies(updatedMovies);
  };

  const onEdit = (item) => {
    setShowToggle(!showToggle);
    setMovieEdit({ item, edit: true });
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="watch">
      <MoviesForm movieEdit={movieEdit} fetchMovies={fetchMovies} />
      <div className="card-header">
        <h4>Title</h4>
        <h4>Date</h4>
        <h4>Rating</h4>
      </div>
      <AnimatePresence>
        {movies.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            <MoviesItem
              item={item.data}
              id={item.id}
              key={item.id}
              onDelete={() => {
                onDelete(item.id);
              }}
              onEdit={() => {
                onEdit(item);
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default MoviesList;
