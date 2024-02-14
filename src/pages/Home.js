import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import BlogDetails from "./BlogDetails";

const Home = () => {
	const [blogs, setBlogs] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/posts");
			const json = await response.json();

			if (response.ok) {
				setBlogs(json);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className="home">
			<div className="posts">{blogs && blogs.map((blog) => <BlogDetails key={blog._id} post={blog} />)}</div>
		</div>
	);
};

export default Home;
