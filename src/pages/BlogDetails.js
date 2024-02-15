import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";

const BlogDetails = () => {
	const { dispatch } = useBlogsContext();
	const { user } = useAuthContext();
	const { id } = useParams();
	const [blog, setBlog] = useState([]);
	const [selectedBlog, setSelectedBlog] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = () => {
		axios.get(`http://localhost:4000/api/posts/${id}`).then((res) => {
			setBlog(res.data);
			// console.log(res.data);
		});
	};

	const handleUpdateClick = () => {
		setSelectedBlog(blog);
	};

	const handleUpdateDone = () => {
		setSelectedBlog(null);
		fetchPosts();
	};

	const handleDelete = async () => {
		if (!user) {
			return;
		}
		const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_BLOG", payload: json });
			navigate("/");
		}
	};

	return (
		<div className="blog-details">
			{selectedBlog === blog && (
				<UpdateForm
					id={id}
					initialTitle={blog.title}
					initialDescription={blog.description}
					initialAuthor={blog.author}
					onUpdate={handleUpdateDone}
				/>
			)}
			<h4>Title: {blog.title}</h4>
			<p>Author: {blog.author}</p>
			<p>Description: {blog.description}</p>
			<p>Likes: {blog.likes}</p>
			<p>Comments: {blog.comments}</p>
			<button onClick={handleUpdateClick}>Update Blog</button>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};

export default BlogDetails;
