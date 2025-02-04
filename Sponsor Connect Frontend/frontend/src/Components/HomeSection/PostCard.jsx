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
const PostCard = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch = useDispatch();
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
    dispatch(createRePost(item?.id));
    console.log("handle create rePost");
  };
  const handleLikePost = () => {
    dispatch(likePost(item?.id));
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
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          alt="username"
          src="https://avatars.githubusercontent.com/u/122539779?v=4"
        ></Avatar>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">
                @{item?.user?.fullName.split(" ").join("_").toLowerCase()}
              </span>
              <img
                src="https://i.pinimg.com/736x/a5/a8/b9/a5a8b9ce5bda5871f138603fb10ce01d.jpg"
                alt=""
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
            <div
              onClick={() => navigate(`/post/${item?.id}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">{item?.content}</p>
              <img className="w-[32rem] border" src={item?.image} alt=""></img>
            </div>
            <div className="py-5 flex flex-wrap justify-around items-center">
              <div className="space-x-3 flex items-center text-gray-800">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>

              <div
                className={`${
                  item?.repost ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  onClick={handleCreateRePost}
                  className="cursor-pointer"
                />
                <p>{item?.totalRePosts}</p>
              </div>

              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteBorderIcon
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteIcon
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
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
        <ReplyModal
          item={item}
          open={openReplyModal}
          handleClose={handleCloseReplyModal}
        ></ReplyModal>
      </section>
    </React.Fragment>
  );
};

export default PostCard;
