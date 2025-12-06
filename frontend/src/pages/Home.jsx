import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-xl text-center">

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {user ? (
          <>
            <h2 className="text-3xl font-bold text-indigo-700 mb-3">
              Welcome, {user.username}
            </h2>
            <p className="text-gray-600 mb-4">Email: {user.email}</p>

            <p className="text-gray-700">
              Your HR dashboard will appear here — attendance, check-in, check-out, employee records, and more.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome to LiteHR
            </h2>

            <div className="space-y-4">
              <Link
                className="block w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="block w-full bg-gray-200 text-gray-800 p-3 rounded-lg font-medium hover:bg-gray-300"
                to="/register"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
