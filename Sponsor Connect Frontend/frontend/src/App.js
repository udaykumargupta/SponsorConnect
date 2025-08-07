import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Authentication from "./Components/Authentication/Authentication";
import HomePage from "./Components/HomePage/HomePage";
// 1. Import useState along with useEffect
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./Store/Auth/Action";

function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. Add the theme state management logic here
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // 3. Add the useEffect to apply the theme to the <html> tag
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]); // This runs whenever the theme state changes

  // Your existing useEffect for authentication
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      // You might not need this navigate("/") if the user is already there,
      // but it was in your original code.
      navigate("/");
    }
  }, [auth.jwt, dispatch]);

  // 4. Create the function that will toggle the theme
  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    // 5. Apply theme-aware classes to your main container
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Routes>
        <Route
          path="/*"
          element={
            auth.user ? (
              // 6. Pass the theme and the handler function to HomePage
              <HomePage theme={theme} handleChangeTheme={handleChangeTheme} />
            ) : (
              <Authentication />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;