import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-title">MyGameSite</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Game</Link>
      </div>
    </div>
  );
}

export default NavBar;
