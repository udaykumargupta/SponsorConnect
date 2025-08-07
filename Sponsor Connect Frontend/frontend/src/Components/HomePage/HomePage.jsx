import React from "react";
import { Grid, AppBar, Toolbar, IconButton, Box, Avatar, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import Rightpart from "../RightPart/Rightpart";
import Profile from "../Profile/Profile";
import PostDetails from "../PostDetails/PostDetails";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon (for light mode)
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon (for dark mode)
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// Accept `theme` and `handleChangeTheme` as props
const HomePage = ({ theme, handleChangeTheme }) => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    // The main background color is handled by App.js, so this Box is transparent
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: theme === 'dark' ? "#15202b" : "white",
          color: theme === 'dark' ? "white" : "black",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: theme === 'dark' ? "#38444d" : "#e0e0e0",
          transition: "background-color 0.3s, border-color 0.3s"
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
              alt="SponsorConnect Logo"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              <span className="text-blue-500">Sponsor</span>Connect
            </h1>
          </div>

          {/* Search */}
          <div className="relative flex items-center max-w-lg mx-auto ml-4">
            <input
              type="text"
              placeholder="Search"
              className="py-3 pl-12 pr-16 rounded-md w-full transition-all duration-300 ease-in-out
                         bg-gray-100 dark:bg-gray-800
                         text-gray-700 dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-0 top-0 flex items-center pl-4 h-full">
              <SearchIcon className="text-gray-800 dark:text-gray-300" />
            </div>
            <IconButton onClick={handleChangeTheme} sx={{position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)'}}>
                {theme === "dark" ? (
                    <Brightness7Icon className="text-yellow-400" />
                ) : (
                    <Brightness4Icon className="text-gray-700 hover:text-blue-500" />
                )}
            </IconButton>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <Avatar
              alt="username"
              src={auth.user?.image || "https://media.licdn.com/dms/image/v2/D5635AQF_r_cKObJXKg/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1722740856510?e=1731398400&v=beta&t=Nw2Dcpydpw5vXXu8cBvCL4MOr-YJfCP6FUh1gWcBJnc"}
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            />
            <Menu
  id="user-menu"
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  MenuListProps={{ "aria-labelledby": "user-menu" }}
  PaperProps={{
    sx: {
      // Added more styling to the dropdown container
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      minWidth: 220,
      bgcolor: theme === 'dark' ? '#1e2732' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
      border: '1px solid',
      borderColor: theme === 'dark' ? '#38444d' : '#e0e0e0',
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
    }
  }}
>
  {/* User Info Section */}
  <MenuItem sx={{ paddingY: '12px' }}>
    <ListItemIcon>
        <PersonIcon fontSize="small" sx={{color: theme === 'dark' ? 'white' : 'black'}}/>
    </ListItemIcon>
    <div>
      <div className="font-bold">{auth.user?.fullName}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
      </div>
    </div>
  </MenuItem>

  {/* Divider to separate info from actions */}
  <Divider sx={{ borderColor: theme === 'dark' ? '#38444d' : '#e0e0e0' }} />

  {/* Logout Action */}
  <MenuItem
    onClick={handleLogout}
    sx={{
      paddingY: '12px',
      '&:hover': {
        backgroundColor: theme === 'dark' ? '#38444d' : 'rgba(0, 0, 0, 0.04)'
      }
    }}
  >
    <ListItemIcon>
      <LogoutIcon fontSize="small" sx={{color: theme === 'dark' ? 'white' : 'black'}} />
    </ListItemIcon>
    Logout
  </MenuItem>
</Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, mt: 8, px: 2 }}>
        <Grid container spacing={1}>
          {/* Left Sidebar */}
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              display: { xs: "none", lg: "block" },
              position: "sticky",
              top: "60px",
              height: "calc(100vh - 60px)",
              overflowY: "auto",
              borderRight: "1px solid",
              borderColor: theme === 'dark' ? "#38444d" : "#e0e0e0",
              paddingRight: "9px",
            }}
          >
            {/* FIX: Pass theme prop to Navigation */}
            <Navigation theme={theme} />
          </Grid>

          {/* Main Content Section */}
          <Grid item xs={12} lg={6} sx={{ paddingRight: "10px" }}>
            <Routes>
              <Route path="/" element={<HomeSection theme={theme} />} />
              <Route path="/home" element={<HomeSection theme={theme} />} />
              <Route path="/profile/:id" element={<Profile theme={theme} />} />
              <Route path="/post/:id" element={<PostDetails theme={theme} />} />
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
              top: "60px",
              height: "calc(100vh - 60px)",
              overflowY: "auto",
              borderLeft: "1px solid",
              borderColor: theme === 'dark' ? "#38444d" : "#e0e0e0",
              paddingLeft: "10px",
                  '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
    scrollbarWidth: 'none',
            }}
          >
            {/* FIX: Pass theme prop to Rightpart */}
            <Rightpart theme={theme} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
