import React from "react";
import { useState, useEffect } from "react";
import BlogDetails from "./BlogDetails";
import "./styles/Home.css";
import BlogList from "./BlogList";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");

      if (response.ok) {
        const json = await response.json();
		console.log(json);
        setBlogs(json.posts);
        setIsPending(false);
      } else {
        setError("Failed to fetch data.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending ? (
        <div> Loading... </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="featured-container">
          <div className="featured-img">
            <img
              src="https://www.gettingsmart.com/wp-content/uploads/2017/07/Architecture-Design-Adult-Working-Feature-Image.jpg"
              alt="designer"
            />
          </div>

          <div className="featured-blog">
            <h3>Featured</h3>
            <h1>Breaking Into Architectural Design</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h3>
            <Link to="/">Read Blog</Link>
          </div>
        </div>
      )}
      <div className="blogList">{blogs && <BlogList blogs={blogs} />}</div>
    </div>
  );
};

export default Home;
