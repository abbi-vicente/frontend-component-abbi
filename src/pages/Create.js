import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const Create = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const blog = { title, body, author };

		setIsLoading(true);

		fetch("http://localhost:8000/blogs/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(blog),
		}).then(() => {
			console.log("new blog added");
			setIsLoading(false);
			navigate("/");
		});
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
			</form>
		</div>
	);
};

export default Create;
