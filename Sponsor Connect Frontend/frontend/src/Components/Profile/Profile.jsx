import React, { useState } from "react";
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
import { useEffect } from "react";
import { getUsersPosts } from "../../Store/Post/Action";
const Profile = () => {
  const navigate = useNavigate();
  const [openProfileModal,setOpenProfileModal]=useState(false);
  const dispatch=useDispatch();
  const {auth , post }=useSelector(store=>store);
  const {id}=useParams();
    const handleOpenProfileModel = () => setOpenProfileModal(true);
    const handleClose = () => setOpenProfileModal(false);
  const handleBack = () => navigate(-1);
  const handlefollowUser = () => {
    dispatch(followUserAction(id));
    console.log("follow user");
  };
  const  [tabValue,setTabValue]=useState("1");
  const handleTabChange=(event,newValue)=>{
    setTabValue(newValue);
    if(newValue===4){
        console.log("tab 4");
    }
    else if(newValue===1){
        console.log("user posts");
    }
  }
  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersPosts(id));
  }, [id]);
  console.log("auth",auth);

  return (
    <div>
      <section className={"bg-white z-50 flex items-center sticky top-0 bg-opacity-95"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{auth.findUser?.fullName}</h1>
      </section>

      <section>
        <img
          className="w-[[100%] h-[15rem] object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEPtxbn85lgy1yXnB4sjytNqRDoNUV-haLQ&s"
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="uday"
            src={auth.findUser?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          ></Avatar>
          {auth.findUser?.req_user? (
            <Button
              onClick={handleOpenProfileModel}
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handlefollowUser}
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              { auth.findUser?.followed?"UNFOLLOW" : "FOLLOW"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {true && (
              <img
                src="https://i.pinimg.com/736x/a5/a8/b9/a5a8b9ce5bda5871f138603fb10ce01d.jpg"
                alt=""
                className="ml-2 w-5 h-5"
              ></img>
            )}
          </div>
          <h1 className="text-grey-500">@{auth.findUser?.fullName.split(" ").join("_".toLowerCase())}</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{auth.findUser?.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>

            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">{auth.findUser?.location}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon/>
              <p className="ml-2">joinded April 2004</p>
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
      <section className='py-5'>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Replies" value="2" />
            <Tab label="Media" value="3" />
            <Tab label="Likes" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
            {post.posts.map((item)=><PostCard
            item={item}></PostCard>)}</TabPanel>
        <TabPanel value="2">users replies</TabPanel>
        <TabPanel value="3">Media</TabPanel>
        <TabPanel value="4">Likes</TabPanel>
      </TabContext>
    </Box>
      </section>
     <section>
      <ProfileModal handleClose={handleClose} open={openProfileModal}/>
      </section> 
    </div>
  );
};

export default Profile;
