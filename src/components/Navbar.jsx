import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BaseUrl = import.meta.env.VITE_APP_BASEURL;

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("CurrentUser");

  const handleLogout = async () => {
    try {
      const res = await axios.get(BaseUrl + "/api/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("CurrentUser");

      navigate("/login");
      toast.success(res.data?.message || "Logout successful");
    } catch (err) {
      alert("Logout failed");
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="bg-red-700 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">MovieApp</h1>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/add" className="hover:underline">
              Add Movie
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
