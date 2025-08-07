import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// 1. The component already accepts the `theme` prop, which is correct.
const Navigation = ({ theme }) => {
  const navigate = useNavigate();
  const { auth } = useSelector(store => store);

  return (
    // 2. Updated the main container to be theme-aware.
    // It now switches between a white and a dark background.
    <div className="hideScrollBar top-0 bg-white dark:bg-[#15202b] shadow-lg rounded-lg overflow-hidden transition-colors duration-300 h-full">
      <div className="flex flex-col space-y-2 p-6">
        {navigationMenu.map((item) => (
          <div
            key={item.title}
            // 3. Updated the hover effect and text colors for dark mode.
            className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl 
                       hover:bg-gray-100 dark:hover:bg-gray-800 
                       transition duration-300"
            onClick={() =>
              item.title === "Profile"
                ? navigate(`/profile/${auth.user?.id}`)
                : navigate(item.path)
            }
          >
            {/* 4. Updated icon color */}
            <div className="text-2xl text-black dark:text-white">{item.icon}</div>
            {/* 5. Updated text color */}
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
