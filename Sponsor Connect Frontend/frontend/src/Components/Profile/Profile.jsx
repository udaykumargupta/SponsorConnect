import React, { useState, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, Tab } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TabContext, TabList, TabPanel} from "@mui/lab";
import PostCard from "../HomeSection/PostCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/Action";
import { getUsersPosts } from "../../Store/Post/Action";

const Profile = ({ theme }) => {
  const navigate = useNavigate();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const dispatch = useDispatch();
  const { auth, post } = useSelector(store => store);
  const { id } = useParams(); // The ID from the URL, e.g., "/profile/123"

  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const handleBack = () => navigate(-1);
  const handlefollowUser = () => {
    dispatch(followUserAction(id));
  };

  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersPosts(id));
  }, [id, dispatch]);

  return (
    <div className="bg-white dark:bg-[#15202b] min-h-screen text-gray-800 dark:text-white">
      <section
        className={
          "bg-white dark:bg-[#15202b] z-50 flex items-center sticky top-0 bg-opacity-95"
        }
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer text-gray-800 dark:text-white"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth.findUser?.fullName}
        </h1>
      </section>

      <section>
        <img
          className="w-full h-[15rem] object-cover"
          src={
            auth.findUser?.backgroundImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEPtxbn85lgy1yXnB4sjytNqRDoNUV-haLQ&s"
          }
          alt="background"
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="user avatar"
            src={auth.findUser?.image}
            sx={{
              width: "10rem",
              height: "10rem",
              border: "4px solid",
              borderColor: theme === "dark" ? "#15202b" : "white",
            }}
          />

          {/* FIX: This logic directly compares the logged-in user's ID to the URL's ID. */}
          {/* This is the most reliable way to determine if you are viewing your own profile. */}
          {auth.user?.id.toString() === id ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handlefollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {auth.findUser?.followed ? "UNFOLLOW" : "FOLLOW"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {true && (
              <img
                src="https://i.pinimg.com/736x/a5/a8/b9/a5a8b9ce5bda5871f138603fb10ce01d.jpg"
                alt="verified badge"
                className="ml-2 w-5 h-5"
              />
            )}
          </div>
          <h1 className="text-gray-500">
            @{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}
          </h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{auth.findUser?.bio}</p>
          <div className="py-1 flex flex-wrap space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">{auth.findUser?.location}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined April 2004</p>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.following?.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followers?.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: theme === "dark" ? "gray" : "divider",
              }}
            >
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                sx={{
                  "& .Mui-selected": {
                    color: theme === "dark" ? "#1d9bf0 !important" : "",
                  },
                  "& .MuiTab-root": {
                    color: theme === "dark" ? "white" : "black",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#1d9bf0",
                  },
                }}
              >
                <Tab label="Posts" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {/* FIX: Added optional chaining (?.) to prevent crash if post.posts is undefined */}
              {post.posts?.filter(item => !item.reply).map((item) => (
                <PostCard key={item.id} item={item} theme={theme} />
              ))}
            </TabPanel>
            <TabPanel value="2">
              {/* FIX: Added optional chaining (?.) here as well */}
              {post.posts?.filter(item => item.reply).map((item) => (
                <PostCard key={item.id} item={item} theme={theme} />
              ))}
            </TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">
               {/* FIX: Added optional chaining (?.) to prevent crash if post.likedPosts is undefined */}
               {post.likedPosts?.map((item) => (
                <PostCard key={item.id} item={item} theme={theme} />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModal
          handleClose={handleClose}
          open={openProfileModal}
          theme={theme}
        />
      </section>
    </div>
  );
};

export default Profile;
