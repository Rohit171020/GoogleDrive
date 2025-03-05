import React, { useState, useEffect } from "react";
import axios from "axios";

const LetterList = () => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/letter`,
          { headers: { authorization: `${token}` } }
        );
        setLetters(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLetters();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 mt-12 rounded-2xl">
      <h2 className="text-4xl font-extrabold text-gray-100 mb-8 text-center">
        📜 Your Letters
      </h2>

      {letters.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          No letters found. Start writing your first letter! 📝
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {letters.map((letter) => (
            <div
              key={letter._id}
              className="p-6 rounded-2xl shadow-xl border border-gray-700 bg-gray-850 transition duration-300 hover:bg-gray-700 hover:scale-105 transform"
            >
              <h3 className="text-2xl font-semibold text-gray-50 truncate">
                {letter.title}
              </h3>

              <p className="text-gray-300 mt-3 text-sm line-clamp-3">
                {letter.content.substring(0, 120)}...
              </p>

              <a
                href={`https://docs.google.com/document/d/${letter.googleDriveId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-blue-400 font-medium hover:text-blue-300 transition duration-200"
              >
                📄 View in Google Drive →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LetterList;
