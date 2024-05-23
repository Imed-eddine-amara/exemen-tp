import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import NAVBAR from '../compenent/navbar.jsx';
import "./write.scss";

const WritePost = ({ user }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [category, setCategory] = useState("art");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const publishPost = async () => {
   
        if (!title.trim() || !postText.trim()) {
            setMessage("Please enter both title and post text.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("post_text", postText);
        formData.append("category", category);
        formData.append("image", image);
        formData.append("user_id", Cookies.get("user_id"));

        try {
            const response = await axios.post('http://localhost:80/create_post.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data);
            navigate("/home");
        } catch (error) {
            console.error('Error publishing post:', error);
            setMessage('Error publishing post');
        }
    };

    return (
        <div>
            <NAVBAR />
            <div className="content">
                <input type="text" className="title-input" placeholder="Title of the post" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="upload-image">
                    <input type="file" id="image-upload" onChange={handleImageChange} />
                    <label htmlFor="image-upload">Upload Image</label>
                </div>
                <textarea className="editor" value={postText} onChange={(e) => setPostText(e.target.value)}></textarea>
                <div className="buttons">
                    <button onClick={publishPost}>Publish</button>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="art">Art</option>
                        <option value="science">Science</option>
                        <option value="technology">Technology</option>
                        <option value="cinema">Cinema</option>
                        <option value="design">Design</option>
                        <option value="food">Food</option>
                    </select>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default WritePost;
