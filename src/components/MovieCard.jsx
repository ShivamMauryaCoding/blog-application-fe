import axios from "axios";
import { useNavigate } from "react-router-dom";

const BaseUrl = import.meta.env.VITE_APP_BASEURL;

const MovieCard = ({ movie, refresh }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/update/${movie._id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BaseUrl}/api/movies/delete/${movie._id}`, {
        withCredentials: true,
      });
      refresh();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="bg-white w-full max-w-sm p-5 shadow rounded-xl border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{movie.title}</h3>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Genre:</span> {movie.genre}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Director:</span> {movie.director}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Release Year:</span> {movie.releaseYear}
      </p>
      <p className="text-gray-700 mt-3">{movie.description}</p>

      <div className="mt-5 flex justify-between items-center">
        <button
          onClick={handleEdit}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
