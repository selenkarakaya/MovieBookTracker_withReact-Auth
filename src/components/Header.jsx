import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="d-flex justify-content-between nav">
        <button className="btn">
          <Link to="/">Home</Link>
        </button>
        <div className="navbar">
          <button className="btn">
            <Link to="/Profile">Account</Link>
          </button>
          <button className="btn">
            <Link to="/SignIn">Sign in</Link>
          </button>
          <button className="btn">
            <Link to="/SignUp">Register</Link>
          </button>
        </div>
      </nav>
      <header className="header">
        <img src={Logo} alt="Logo" style={{ width: "6rem", height: "6rem" }} />
        <h1>Movie&Book Tracker</h1>
      </header>
    </>
  );
}

export default Header;
