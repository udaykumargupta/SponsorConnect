import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModal from "./ReplyModal";
const PostCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
    const [openReplyModal,setOpenReplyModal]=useState(false);
      const handleOpenReplyModel = () => setOpenReplyModal(true);
      const handleCloseReplyModal = () => setOpenReplyModal(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleDelete = () => {
    console.log("delete Post");
    handleClose();
  };

  const handleCreateRePost = () => {
    console.log("handle create rePost");
  };
  const handleLikePost = () => {
    console.log("handle create like post");
  };
  return (
    <React.Fragment>
      {/* <div className="flex items-center font-semibold text-gray-700 py-2">
        <RepeatIcon></RepeatIcon>
      </div> */}
      <div className="flex space-x-5">
        <Avatar
          className="cursor-pointer"
          OnClick={() => navigate(`/profile/${6}`)}
          alt="username"
          src="https://avatars.githubusercontent.com/u/122539779?v=4"
        ></Avatar>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Uday</span>
              <span className="text-gray-600">@udaygupta .2m</span>
              <img src='https://i.pinimg.com/736x/a5/a8/b9/a5a8b9ce5bda5871f138603fb10ce01d.jpg' alt=""
                className="ml-2 w-5 h-5"
              ></img>
            </div>

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon></MoreHorizIcon>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleDelete}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2">
            <div  onClick={()=>navigate('/post/${3}')}className="cursor-pointer">
              <p className="mb-2 p-0">
                Sponsor Connect-Full Stack project with spring boot and react
              </p>
              <img
                className="w-[32rem] border"
                src="https://avatars.githubusercontent.com/u/122539779?v=4"
                alt=""
              ></img>
            </div>
            <div className="py-5 flex flex-wrap justify-around items-center">
            <div className="space-x-3 flex items-center text-gray-800">
              <ChatBubbleOutlineIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModel}
              />
              <p>43</p>
            </div>

            <div
              className={`${
                true ? "text-pink-600" : "text-gray-600"
              } space-x-3 flex items-center`}
            >
              <RepeatIcon
                onClick={handleCreateRePost}
                className="cursor-pointer"
              />
              <p>54</p>
            </div>

            <div
              className={`${
                true ? "text-pink-600" : "text-gray-600"
              } space-x-3 flex items-center`}
            >
              {false ? (
                <FavoriteIcon
                  onClick={handleLikePost}
                  className="cursor-pointer"
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={handleLikePost}
                  className="cursor-pointer"
                />
              )}
              <p>540</p>
            </div>

            <div className="space-x-3 flex items-center text-gray-600">
              <BarChartIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModel}
              />
              <p>453</p>
            </div>

            <div className="space-x-3 flex  items-center text-gray-600">
              <FileUploadIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModel}
              />
              <p>43</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal}></ReplyModal>
    </section>
    </React.Fragment>
  );
};

export default PostCard;
