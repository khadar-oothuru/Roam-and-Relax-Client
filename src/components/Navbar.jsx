import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { MdWavingHand } from "react-icons/md";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const { isUserLoggedIn, username, profileImage, logout } =
    useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to homepage after logout
  };

  useEffect(() => {
    // Any necessary logic when isUserLoggedIn, username, or profileImage changes
  }, [isUserLoggedIn, username, profileImage]);

  return (
    <div
      className="navbar bg-white shadow-md px-5 py-3 sticky top-0 z-50"
      style={{ height: "4rem" }}
    >
      <div className="navbar-start">
        {/* Hamburger Menu for Small Devices */}
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content absolute z-50 bg-white text-gray-800 rounded-box mt-3 w-52 p-2 shadow"
          >
            {!isUserLoggedIn ? (
              <>
                <li>
                  <Link to="/" className="hover:text-[#ff7c5b] text-lg">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#ff7c5b] text-lg">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#ff7c5b] text-lg">
                    Contact Us
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="hover:text-[#ff7c5b] text-lg"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Profile
                  </button>
                  <ProfileModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    username={username}
                    profileImage={profileImage}
                    email="user@example.com"
                    onEdit={() => console.log("Edit button clicked")}
                  />
                </li>
                <li>
                  <Link
                    to="/mybookings"
                    className="hover:text-[#ff7c5b] text-lg"
                  >
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-[#ff7c5b] text-lg text-gray-800"
                  >
                    Faqs
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-[#ff7c5b] text-lg"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className=" hidden md:block text-md font-bold permanent-marker-regular text-gray-800 permanent-marker-regular "
        >
          <span className="text-[#ff7c5b]">Roam</span>
          <span className="text-[#001337]">&</span>
          <span className="text-[#ff7c5b]">Relax</span>
        </Link>
      </div>

      {/* Center Menu for Large Devices */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {!isUserLoggedIn ? (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-[#ff7c5b] text-lg text-gray-800"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#ff7c5b] text-lg text-gray-800"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#ff7c5b] text-lg text-gray-800"
                >
                  Contact Us
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/packages"
                  className="hover:text-[#ff7c5b] text-lg text-gray-800"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#ff7c5b] text-lg text-gray-800"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-[#ff7c5b] text-lg text-gray-800"
                >
                  Faqs
                </Link>
              </li>
              <li>
                <Link
                  to="/mybookings"
                  className="hover:text-[#ff7c5b] text-lg text-gray-800"
                >
                  My Bookings
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* End Menu */}
      <div className="navbar-end">
        {!isUserLoggedIn ? (
          <button
            className="btn bg-[#ff7c5b] text-white hover:bg-[#001337] hover:text-white text-lg"
            style={{ minWidth: "120px" }}
          >
            <span>
              <LiaPrayingHandsSolid className="inline-block w-5 h-5 mr-2 align-middle" />
              Welcome
            </span>
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="btn bg-[#ff7c5b] text-white hover:bg-[#001337] hover:text-white mr-4 text-lg"
              style={{ minWidth: "120px" }}
            >
              <span>
                <MdWavingHand className="inline-block w-5 h-5 mr-2 align-middle" />
                {username}
              </span>
            </button>

            {profileImage && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border border-gray-300">
                    <img
                      alt="Profile"
                      src={profileImage}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  {/* Profile button */}
                  <li>
                    <button
                      className="justify-between w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Profile
                    </button>
                  </li>

                  {/* Profile Modal */}
                  <ProfileModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    username={username}
                    profileImage={profileImage}
                    email="user@example.com"
                    onEdit={() => console.log("Edit button clicked")}
                  />

                  {/* Logout button */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-500 px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
