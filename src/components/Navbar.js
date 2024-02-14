import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar">
			<h1>OneCodeCamp Blog</h1>
			<div className="links">
				<Link to="/">Home</Link>
				<Link to="/create">New Blog</Link>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		</nav>
	);
};

export default Navbar;
