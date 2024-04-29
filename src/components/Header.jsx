import Logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" style={{ width: "6rem", height: "6rem" }} />
      <h1>Movie&Book Tracker</h1>
    </header>
  );
}

export default Header;
