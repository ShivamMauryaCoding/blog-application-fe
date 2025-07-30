import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BaseUrl = import.meta.env.VITE_APP_BASEURL;

const AddMovie = () => {
  const [formData, setFormData] = useState({ title: "", genre: "", director: "", releaseYear: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BaseUrl}/api/movies/create`, formData, {
        withCredentials: true,
      });

      toast.success(res.data?.message || "Movies added successfully");
      setFormData({ title: "", genre: "", director: "", releaseYear: "", description: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Movies addition failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl mx-auto mt-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Movie
        </h2>

        <input
          type="text"
          placeholder="Movie Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="text"
          placeholder="Director Name"
          value={formData.director}
          onChange={(e) =>
            setFormData({ ...formData, director: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="number"
          placeholder="Release Year"
          value={formData.releaseYear}
          onChange={(e) =>
            setFormData({ ...formData, releaseYear: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Movie Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
