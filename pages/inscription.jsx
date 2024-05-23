import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Inscri() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setBirthday(formattedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('birthday', birthday);

    try {
      const response = await axios.post("http://localhost:80/sign_up.php", formData);
      const data = response.data;
      if (data === "Registration successful") {
        alert("Registration successful");
        navigate("/login");
      } else {
        console.error("Registration failed: ", data);
        alert("Registration failed: " + data);
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert("There was an error! " + error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form id="signup-form" className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input type="text" name="username" placeholder="Username" required
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" name="email" placeholder="Email" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="password" placeholder="Password" required
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <p>
            <label htmlFor="">Gender :</label>
            <input type="radio" name="gender" value="male" checked={gender === 'male'}
              onChange={() => setGender('male')} />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" value="female" checked={gender === 'female'}
              onChange={() => setGender('female')} />
            <label htmlFor="female">Female</label>
          </p>
          <p>
            <label htmlFor="date">Birthday :</label>
            <input type="date" id="date" name="birthday" value={birthday} onChange={handleDateChange} />
          </p>
          <input type="submit" value="Sign Up" />
          <p>Already have an account? <Link to="/login">Identifiez-vous</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Inscri;
