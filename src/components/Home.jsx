import MoviesList from "./MoviesList";
import BooksList from "./BooksList";
function Home() {
  return (
    <div className="container">
      <MoviesList />
      <BooksList />
    </div>
  );
}

export default Home;
