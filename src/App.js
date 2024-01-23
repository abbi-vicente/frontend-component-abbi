import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import BlogDetails from "./pages/BlogDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<BrowserRouter>
				<div className="App">
					<Navbar />
				</div>
				<div className="main">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create" element={<Create />} />
						<Route path="/blogs/:id" element={<BlogDetails />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
