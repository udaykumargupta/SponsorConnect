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
import { useDispatch } from "react-redux";
import { createRePost, likePost } from "../../Store/Post/Action";

// 1. Accept `theme` as a prop in addition to `item`.
const PostCard = ({ item, theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    console.log("delete Post");
    handleClose();
  };

  const handleCreateRePost = () => {
    dispatch(createRePost(item?.id));
  };
  const handleLikePost = () => {
    dispatch(likePost(item?.id));
  };

  return (
    <React.Fragment>
      {/* 2. Apply theme-aware background to the main post container */}
      <div className="flex space-x-5 p-4 bg-white dark:bg-[#15202b] border-b border-gray-200 dark:border-gray-800">
        <Avatar
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          alt="username"
          src={item?.user?.image || "https://avatars.githubusercontent.com/u/122539779?v=4"}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              {/* 3. Update text colors for the user's name and handle */}
              <span className="font-semibold text-gray-900 dark:text-white">{item?.user?.fullName}</span>
              <span className="text-gray-600 dark:text-gray-400">
                @{item?.user?.fullName.split(" ").join("_").toLowerCase()}
              </span>
              <img
                src="https://i.pinimg.com/736x/a5/a8/b9/a5a8b9ce5bda5871f138603fb10ce01d.jpg"
                alt="verified badge"
                className="ml-2 w-5 h-5"
              />
            </div>

            <div>
              {/* 4. Update the color of the "more" icon */}
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{color: theme === 'dark' ? 'white' : 'black'}}
              >
                <MoreHorizIcon />
              </Button>
              {/* 5. Update the dropdown menu's theme */}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
                PaperProps={{
                  sx: {
                    bgcolor: theme === 'dark' ? '#1e2732' : 'white',
                    color: theme === 'dark' ? 'white' : 'black',
                  }
                }}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleDelete}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2">
            <div
              onClick={() => navigate(`/post/${item?.id}`)}
              className="cursor-pointer"
            >
              {/* 6. Update post content and image border colors */}
              <p className="mb-2 p-0 text-gray-800 dark:text-gray-200">{item?.content}</p>
              <img className="w-[32rem] border border-gray-300 dark:border-gray-700 rounded-md" src={item?.image} alt="" />
            </div>
            <div className="py-5 flex flex-wrap justify-around items-center">
              {/* 7. Update all action icons and text colors */}
              <div className="space-x-3 flex items-center text-gray-600 dark:text-gray-400">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer hover:text-blue-500"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>

              <div
                className={`${
                  item?.repost ? "text-pink-600" : "text-gray-600 dark:text-gray-400"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRePost}
                  className="cursor-pointer hover:text-green-500"
                />
                <p>{item?.totalRePosts}</p>
              </div>

              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600 dark:text-gray-400"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteIcon
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={handleLikePost}
                    className="cursor-pointer hover:text-pink-500"
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600 dark:text-gray-400">
                <BarChartIcon
                  className="cursor-pointer hover:text-blue-500"
                  onClick={handleOpenReplyModel}
                />
                <p>453</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600 dark:text-gray-400">
                <FileUploadIcon
                  className="cursor-pointer hover:text-blue-500"
                  onClick={handleOpenReplyModel}
                />
                <p>43</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        {/* 8. Pass the theme to the reply modal */}
        <ReplyModal
          item={item}
          open={openReplyModal}
          handleClose={handleCloseReplyModal}
          theme={theme}
        />
      </section>
    </React.Fragment>
  );
};

export default PostCard;
