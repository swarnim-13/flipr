import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* NAVBAR */}
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center px-6">

          {/* Logo */}
          <div
            className="font-bold text-xl text-primary cursor-pointer"
            onClick={() => navigate("/")}
          >
            NEXT INVEST
          </div>

          {/* Navbar Items */}
          <nav className="space-x-4 flex items-center">

            {/* Always visible */}
            <Link to="/" className="px-4">
              Investment Opportunities
            </Link>
            <Link to="/" className="px-4">
              How it Works
            </Link>
<Link to="/" className="px-4">
              About us
            </Link>
        
            {!token && (
              <>
                {/* Login */}
                <Link
                  to="/admin/login"
                  className="px-4 text-sm bg-primary text-white py-1 rounded"
                >
                  LOGIN
                </Link>

                {/* Register */}
                <Link
                  to="/admin/register"
                  className="px-4 text-sm bg-green-600 text-white py-1 rounded"
                >
                  REGISTER
                </Link>
              </>
            )}

            {token && (
              <>
                {/* Dashboard */}
                <Link to="/admin/dashboard" className="px-4 text-sm">
                  Dashboard
                </Link>

                {/* Add Listing */}
                <Link to="/admin/add-offering" className="px-4 text-sm">
                  Add Listing
                </Link>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="px-4 text-sm bg-red-500 text-white py-1 rounded"
                >
                  Logout
                </button>
              </>
            )}

          </nav>

        </div>
      </header>

      {/* Pages render here */}
      <Outlet />
    </div>
  );
}
