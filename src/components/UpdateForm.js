import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const UpdateForm = ({ id, initialTitle, initialDescription, initialAuthor, onUpdate }) => {
	const [blogs, setBlogs] = useState([]);
	const [title, setTitle] = useState(initialTitle);
	const [description, setDescription] = useState(initialDescription);
	const [author, setAuthor] = useState(initialAuthor);
	const [error, setError] = useState(null);
	const { user } = useAuthContext();

	useEffect(() => {
		fetchBlogs();
	}, []);

	const fetchBlogs = () => {
		axios.get("http://localhost:4000/api/posts").then((res) => {
			setBlogs(res.data);
			console.log(res.data);
		});
	};

	const handleUpdate = () => {
		if (!user) {
			return;
		}
		fetch(`http://localhost:4000/api/posts/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
			body: JSON.stringify({ title, description, author }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Update unsuccessful");
				}
				return response.json();
			})
			.then((data) => {
				onUpdate();
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div className="update">
			<h2>Edit Blog</h2>
			<label>Blog Title: </label>
			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			<label>Blog body: </label>
			<textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
			<label>Blog author: </label>
			<input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
			<button onClick={handleUpdate}>Submit Update</button>
		</div>
	);
};

export default UpdateForm;
