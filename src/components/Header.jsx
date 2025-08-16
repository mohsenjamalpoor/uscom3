import { Link } from "react-router-dom";
import { FaClinicMedical, FaFileAlt } from "react-icons/fa";
import { TiWeatherSunny } from "react-icons/ti";
import { FaMoon } from "react-icons/fa";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header
      className={`sticky top-0 z-10 shadow-md ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <nav className="flex items-center space-x-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 ml-2 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <TiWeatherSunny /> : <FaMoon />}
          </button>
          <Link
            to="/"
            className="flex items-center space-x-1 hover:text-blue-500"
          >
            <FaClinicMedical className="ml-2" />
            <span>صفحه اصلی</span>
          </Link>

          <Link
            to="/docs"
            className="flex items-center space-x-1  hover:text-blue-500"
          >
            <FaFileAlt className="ml-2" />
            <span >توضیحات</span>
          </Link>
        </nav>
        <Link to="/" className="flex items-center space-x-2">
          <span className=" ml-2 text-xl font-bold">USCOM</span>

          <img src="/Uscom-logo.svg" alt="USCOM Logo" className="w-8 h-8" />
        </Link>
      </div>
    </header>
  );
}
