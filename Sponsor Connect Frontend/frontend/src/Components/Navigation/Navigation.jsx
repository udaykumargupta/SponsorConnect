import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Navigation = () => {
  const navigate = useNavigate();
  const {auth}=useSelector(store=>store);

  return (
    <div className="hideScrollBar  top-0 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col space-y-2 p-6">
        {navigationMenu.map((item) => (
          <div
            key={item.title}
            className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl hover:bg-gray-100 transition duration-300"
            onClick={() =>
              item.title === "Profile"
                ? navigate(`/profile/${auth.user?.id}`)
                : navigate(item.path)
            }
          >
            <div className="text-2xl text-black">{item.icon}</div>
            <p className="text-lg font-semibold text-gray-800">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
