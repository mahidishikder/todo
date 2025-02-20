import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-[#FF7F00]">404</h1>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#FF7F00] text-white rounded-lg shadow hover:bg-[#ff9100] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Error;
