import React from "react";
import { useState, useEffect } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";
import BlogDetails from "./BlogDetails";
import "./styles/Home.css";
import BlogList from "./BlogList";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Home = () => {
	const { blogs, dispatch } = useBlogsContext();

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("http://localhost:4000/api/posts");
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_BLOGS", payload: json });
			}
		};

		fetchPosts();
	}, [dispatch]);

	return (
		<div className="home">
			<div className="featured-container">
				<div className="featured-img">
					<img
						src="https://www.gettingsmart.com/wp-content/uploads/2017/07/Architecture-Design-Adult-Working-Feature-Image.jpg"
						alt="designer"
					/>
				</div>
      <div className="featured-blog">
					<h3>Featured</h3>
					<h1>Breaking Into Architectural Design</h1>
					<h3>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</h3>
					<Link to="/">Read Blog</Link>
					<div className="bloglist">{blogs && blogs.map((blog) => <BlogList blog={blog} key={blog._id} />)}</div>
				</div>
			</div>
		</div>
  )
 
};

export default Home;
