require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	if (req.body) {
		console.log("Request body:");
		console.log(req.body);
	}
	next();
});

// Routes
app.use("/api/posts", require("./src/routes/post"));
app.use("/api/users", require("./src/routes/user"));

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Listening on port ${process.env.PORT} and connected to MongoDB`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error.message);
	});
