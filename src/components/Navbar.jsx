import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1 text-decoration-none fw-bold">
          Contact List
        </Link>
        <Link to="/add-contact">
          <button className="btn btn-primary">Add new contact</button>
        </Link>
      </div>
    </nav>
  );
};