import "./styles/BlogList.css";
import { Link } from "react-router-dom";
import { useBlogsContext } from "../hooks/useBlogsContext";

const BlogList = ({ blog }) => {
	const { dispatch } = useBlogsContext();

	const handleClick = async () => {
		const response = await fetch("http://localhost:4000/api/posts/" + blog._id, {
			method: "GET",
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "GET_BLOG", payload: json });
		}
	};

	return (
		<div className="blog-details">
			<Link to={`/posts/${blog._id}`}>
				<h4 onClick={handleClick}>Title: {blog.title}</h4>
			</Link>
			<p>Author: {blog.author}</p>
			<p>Description: {blog.description}</p>
			<p>Likes: {blog.likes}</p>
			<p>Comments: {blog.comments}</p>
		</div>
	);
};

export default BlogList;
