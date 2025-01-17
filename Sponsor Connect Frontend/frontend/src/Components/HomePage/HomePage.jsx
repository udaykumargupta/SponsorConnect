import React from "react";
import { Grid, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import Rightpart from "../RightPart/Rightpart";
import Profile from "../Profile/Profile";
import PostDetails from "../PostDetails/PostDetails";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const HomePage = () => {
  const handleChangeTheme = () => {
    console.log("handle change theme");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("logout");
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ minHeight: 48 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center space-x-2">
            <img
              height={30}
              width={30}
              src="https://i.tracxn.com/logo/company/sponsor-connect.com_Logo_88b5ea28-e9e2-4649-9b28-1a17a65ace31.jpg"
              alt=""
            />
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-blue-500">Sponsor</span>Connect
            </h1>
          </div>

          {/* Search */}
          <div className="relative flex items-center max-w-lg mx-auto ml-4">
            <input
              type="text"
              placeholder="Search"
              className="py-3 pl-12 pr-16 rounded-md text-gray-700 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
            <div className="absolute left-0 top-0 flex items-center pl-4 py-3">
              <SearchIcon className="text-gray-800" />
            </div>
            <Brightness4Icon
              className="absolute right-0 top-3 text-gray-700 mr-4 cursor-pointer hover:text-blue-500 transition-all duration-300"
              onClick={handleChangeTheme}
            />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <Avatar
              alt="username"
              src="https://media.licdn.com/dms/image/v2/D5635AQF_r_cKObJXKg/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1722740856510?e=1731398400&v=beta&t=Nw2Dcpydpw5vXXu8cBvCL4MOr-YJfCP6FUh1gWcBJnc"
              onClick={handleClick} // Open the menu on image click
              sx={{ cursor: "pointer" }}
            />
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "user-menu",
              }}
            >
              <MenuItem>
                <div>
                  <div className="font-bold">Uday Gupta</div>
                  <div className="text-sm text-gray-500">uday@example.com</div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, mt: 8, px: 2 }}>
        <Grid container spacing={2}>
          {/* Left Sidebar */}
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              display: { xs: "none", lg: "block" },
              position: "sticky",
              top: "60px",
              height: "100%",
              overflowY: "auto",
              borderRight: "1px solid #e0e0e0", // Added border
              paddingRight: "3px", // Padding for border spacing
            }}
          >
            <Navigation />
          </Grid>

          {/* Main Content Section */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              paddingRight: "50px", // Padding for border spacing
            }}
          >
            <Routes>
              <Route path="/" element={<HomeSection />} />
              <Route path="/home" element={<HomeSection />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/post/:id" element={<PostDetails />} />
            </Routes>
          </Grid>

          {/* Right Sidebar */}
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              display: { xs: "none", lg: "block" },
              position: "sticky",
              top: "80px",
              height: "calc(100vh - 80px)",
              overflowY: "auto",
              borderLeft: "1px solid #e0e0e0", // Added border
              paddingLeft: "10px", // Padding for border spacing
            }}
          >
            <Rightpart />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
