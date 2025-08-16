import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaUserCircle, FaGraduationCap, FaChalkboardTeacher, FaHome, FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const NavItem = ({ to, icon: Icon, label, end = false }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive
          ? "text-primary/90 font-semibold"
          : "text-foreground hover:text-primary/90 hover:bg-primary/5"
        }`
      }
      onClick={() => setIsMenuOpen(false)}
    >
      <Icon className="text-lg" />
      {label}
    </NavLink>
  );

  const navItems = (
    <>
      <li className="mx-1">
        <NavItem to="/" icon={FaHome} label="Home" end />
      </li>
      <li className="mx-1">
        <NavItem to="/tutors" icon={FaChalkboardTeacher} label="Tutors" />
      </li>
      <li className="mx-1">
        <NavItem to="/all-study-sessions" icon={FaGraduationCap} label="Study Sessions" />
      </li>
    </>
  );

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-sm w-full border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg mr-2">Study</span>
            Sphere
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-2">{navItems}</ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Mode Toggle */}
            {/* Mode Toggle with Icon */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background text-foreground hover:bg-primary/10 transition-colors focus:outline-none shadow-sm"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
            </button>

            {/* Auth Buttons */}
            {!user ? (
              <div className="hidden md:flex gap-2">
                <NavLink to="/login" className="app-btn">
                  Login
                </NavLink>
                <NavLink to="/signup" className="app-btn">
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="user" className="w-9 h-9 rounded-full border border-border shadow-sm" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-border shadow-sm">
                      <FaUserCircle className="text-2xl text-foreground" />
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-background rounded-xl shadow-xl ring-1 ring-border z-50 overflow-hidden">
                    <div className="p-4 bg-primary text-primary-foreground rounded-t-xl flex items-center gap-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} className="w-12 h-12 rounded-full border border-background" alt="user" />
                      ) : (
                        <FaUserCircle className="w-12 h-12 text-3xl" />
                      )}
                      <div>
                        <h3 className="font-semibold truncate">{user.displayName || "User"}</h3>
                        <p className="text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="p-2 flex flex-col gap-2">
                      <NavLink to="/dashboard" className="px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground transition-all">
                        Dashboard
                      </NavLink>
                      <NavLink to="/profile" className="px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground transition-all">
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground transition-all text-left w-full"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="app-btn w-10 h-10 p-0 flex items-center justify-center"
              >
                {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-inner">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <ul className="w-full">{navItems}</ul>

            {!user ? (
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <NavLink to="/login" className="app-btn w-full text-left">Login</NavLink>
                <NavLink to="/signup" className="app-btn w-full text-left">Sign Up</NavLink>
              </div>
            ) : (
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <NavLink to="/dashboard" className="px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground transition-all">Dashboard</NavLink>
                <NavLink to="/profile" className="px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground transition-all">Profile</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground transition-all text-left w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
