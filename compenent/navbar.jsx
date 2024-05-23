import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function NAVBAR() {
  const navigate = useNavigate();
  const username = Cookies.get("username");

  const handleLogout = () => {
    Cookies.remove("sessionToken");
    Cookies.remove("username");
    Cookies.remove("user_id");
    navigate("/login");
  };

  return (
    <header>
      <div class="categories">
        <Link to="/home?category=art" class="active">Art</Link>
        <Link to="/home?category=science">Science</Link>
        <Link to="/home?category=technology">Technology</Link>
        <Link to="/home?category=cinema">Cinema</Link>
        <Link to="/home?category=design">Design</Link>
        <Link to="/home?category=food">Food</Link>
      </div>
      <nav>
        <ul>
          {username && <span>Welcome, {username}</span>}
          <li><Link to="/postpage">Write</Link></li>
          <li><Link to="/"> HOME</Link></li>
          <li><Link to="/login" onClick={handleLogout}>Sign out</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default NAVBAR;
