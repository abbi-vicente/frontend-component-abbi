import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Create.css";

const Create = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const blog = { title, body, author };



		const response = await fetch("http://localhost:4000/api/posts", {
			method: "POST",
			body: JSON.stringify(blog),
			headers: {
				"Content-Type": "application/json",
			},
		});
		
		setIsLoading(true);

		if (!response.ok) {
			setError(json.error);
		}

		const json = await response.json();

		if (response.ok) {
			setTitle("");
			setBody("");
			setAuthor("	");
			setError(null);
			console.log("new blog added");
			setIsLoading(false);
			navigate("/");
		}

		
		// setIsLoading(true);

		// fetch("http://localhost:8000/blogs/", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(blog),
		// }).then(() => {
		// 	console.log("new blog added");
		// 	setIsLoading(false);
		// 	navigate("/");
		// });
	};

	return (
		<div className="create">
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog Title: </label>
				<input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
				<label>Blog body: </label>
				<textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
				<label>Blog author: </label>
				<input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} />
				{!isLoading && <button>Add Blog</button>}
				{isLoading && <button disabled>Adding Blog...</button>}
				{error && <div className="error">{error}</div>}
			</form>
		</div>
	);
};

export default Create;
