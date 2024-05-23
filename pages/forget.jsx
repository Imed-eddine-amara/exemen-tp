import { Link } from "react-router-dom";
import { useState } from "react";
import "./forget.scss";


function Forg() {
  const sendEmail = async () => {
    try {
      var code = Math.floor(100000 + Math.random() * 900000);

      const response = await fetch('http://localhost:3001/forgetpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'edineamara3@gmail.com',
          text: `Your password reset code is: ${code}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form className="login-form">
        <h2>Forgot Password</h2>
        <input type="text" name="email" placeholder="Email" required />
        <button type="button" onClick={sendEmail}>Send Code</button>
        <p>Remembered your password? <Link to="/login">Login</Link></p>
      </form>

      <div>
          <input type="text" name="" id="" />
      </div>
    </div>
  );
}

export default Forg;
