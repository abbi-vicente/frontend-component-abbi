import React, { useState } from "react";
import "./Registration.css";
import { useRegister } from "../hooks/useRegister";

const Registration = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { register, error, isLoading } = useRegister();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await register(username, password);
	};

	return (
		<form className="registration" onSubmit={handleSubmit}>
			<h3>Register</h3>
			<label>Username: </label>
			<input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
			<label>Password: </label>
			<input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
			<button disabled={isLoading}>Register</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Registration;
