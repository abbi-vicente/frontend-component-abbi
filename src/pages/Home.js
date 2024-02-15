import React from "react";
import { useEffect } from "react";
import "./Home.css";
import { useBlogsContext } from "../hooks/useBlogsContext";
import BlogList from "./BlogList";

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
			<div className="blogs">{blogs && blogs.map((blog) => <BlogList blog={blog} key={blog._id} />)}</div>
		</div>
	);
};

export default Home;

// import React from "react";
// import { useEffect, useState } from "react";

// const Home = () => {
// 	const [blogs, setBlogs] = useState(null);

// 	useEffect(() => {
// 		const fetchBlogPosts = async () => {
// 			const response = await fetch("http://localhost:4000/api/posts");
// 			const json = await response.json();

// 			if (response.ok) {
// 				setBlogs(json);
// 			}
// 		};

// 		fetchBlogPosts();
// 	}, []);

// 	return (
// 		<div className="home">
// 			<div className="blogs">{blogs && blogs.map((blog) => <p key={blog._id}>{blog.title}</p>)}</div>
// 		</div>
// 	);
// };

// export default Home;
