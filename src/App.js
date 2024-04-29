import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import BooksList from "./components/BooksList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
      <div className="container">
        <MoviesList />
        <BooksList />
      </div>
    </Router>
  );
}

export default App;
