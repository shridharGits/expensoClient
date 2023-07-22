import { Link } from "react-router-dom";
import Header from "./Header";
const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col items-center mt-12 justify-center">
        <Link to="/signin">
          <button className="bg-sky-950 w-64 h-12 text-white rounded-lg m-4">
            Sign In
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-sky-950 w-64 h-12 text-white rounded-lg m-4">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
