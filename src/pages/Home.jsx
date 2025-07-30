import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";

const BaseUrl = import.meta.env.VITE_APP_BASEURL;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("CurrentUser"));

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BaseUrl}/api/movies`, {
        withCredentials: true,
      });

      setMovies(res.data.movies);
      setLoading(false);
      toast.success(res.data?.message || "Movies fetched successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch movies");
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Your Movies</h2>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} refresh={fetchMovies} />
        ))}
        </div>
    </div>
  );
};

export default Home;
