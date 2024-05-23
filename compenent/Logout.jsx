import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("sessionToken");
    Cookies.remove("username");
    Cookies.remove("user_id");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
