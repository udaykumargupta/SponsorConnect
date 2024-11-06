import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
const PostCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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

  const handleOpenReplyModel = () => {
    console.log("open model");
  };
  const handleCreateRePost = () => {
    console.log("handle create rePost");
  };
  const handleLikePost = () => {
    console.log("handle create like post");
  };
  return (
    <div className="">
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
              <img
                className="ml-2 w-5 h-5"
                src="data:image/png;base64,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"
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
            <div className="cursor-pointer">
              <p className="mb-2 p-0">
                Sponsor Connect-Full Stack project with spring boot and react
              </p>
              <img
                className="w-[28rem] border"
                src="https://avatars.githubusercontent.com/u/122539779?v=4"
                alt=""
              ></img>
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
            <div className="space-x-3 flex items-center text-gray-600">
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
    </div>
  );
};

export default PostCard;
