import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NAVBAR from '../compenent/navbar.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    fetchPosts(category);
  }, [category]);

  const fetchPosts = async (category) => {
    try {
      const response = await axios.get(`http://localhost:80/get_posts.php?${category ? `category=${category}` : ''}`);
      const responseData = response.data;
      
      if (Array.isArray(responseData) && responseData.length > 0) {
        setPosts(responseData);
        setErrorMessage(""); 
      } else if (responseData.message) {
        setPosts([]);
        setErrorMessage(responseData.message);
      } else {
        setPosts([]);
        setErrorMessage("Unknown error occurred.");
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setErrorMessage("Error fetching posts. Please try again later.");
    }
  };

  return (
    <div>
      <NAVBAR />
      <main>
        <h1>Welcome to the Home Page</h1>
        <h2>Category: {category || "All"}</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.post_text}</p>
              <p>Category: {post.category}</p>
              <p>By: {post.username} <br/> on {new Date(post.created_at).toLocaleDateString()}</p>
              {}
              {post.image && <img src={`data:image/png;base64,${post.image}`} alt="Post" />}

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
