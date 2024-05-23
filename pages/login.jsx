import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:80/sign_in.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "Login successful") {
          Cookies.set("sessionToken", "your-session-token", { expires: 1 });
          Cookies.set("username", data.username, { expires: 1 });
          Cookies.set("user_id", data.user_id, { expires: 1 });
          navigate("/home");
        } else {
          setErrorMessage("Username or password is incorrect");
        }
      } else {
        console.error("Failed to log in:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container">
      <form className="signup-form" id="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <a id="left">
          <Link to="/forgetpass">Forget Password</Link>
        </a>
        <p>
          Don't have an account? <Link to="/inscription">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
