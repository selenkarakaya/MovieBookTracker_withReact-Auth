import BooksItem from "./BooksItem";
import BookForm from "./BookForm";
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
import { getAuth } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

function BooksList() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToggle, setShowToggle] = useState(false);
  const [bookEdit, setBookEdit] = useState({ item: {}, edit: false });
  const auth = getAuth();
  var user = auth.currentUser;
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);
  const fetchBooks = async () => {
    try {
      // get refence
      const booksRef = collection(db, "books");
      const q = query(booksRef, orderBy("text", "desc"));
      // Execute query
      const querySnap = await getDocs(q);
      const books = [];
      querySnap.forEach((doc) => {
        if (user) {
          if (doc.data().userRef === auth.currentUser.uid) {
            return books.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        } else if (doc.data().userRef === undefined) {
          return books.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });
      setBooks(books);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (itemId) => {
    await deleteDoc(doc(db, "books", itemId));
    const updatedBooks = books.filter((item) => item.id !== itemId);
    setBooks(updatedBooks);
  };
  const onEdit = (item) => {
    setShowToggle(!showToggle);
    setBookEdit({ item, edit: true });
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="read">
      <BookForm bookEdit={bookEdit} fetchBooks={fetchBooks} />
      <div className="card-header">
        <h4>Title</h4>
        <h4>Date</h4>
        <h4>Rating</h4>
      </div>
      <AnimatePresence>
        {books.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            <BooksItem
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

export default BooksList;
