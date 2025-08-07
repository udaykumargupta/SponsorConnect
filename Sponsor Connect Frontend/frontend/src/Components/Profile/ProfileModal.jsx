import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/Action";
import { uploadToCloudnary } from "../../utils/uploadToCloudnary";

// 1. Update the component to accept the `theme` prop.
export default function ProfileModal({ open, handleClose, theme }) {
  const [uploading, setUploading] = React.useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [selectedImage, setSelectedImage] = React.useState(auth.user?.image || "");

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    setSelectedImage("");
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fullName: auth.user?.fullName || "",
      website: auth.user?.website || "",
      location: auth.user?.location || "",
      bio: auth.user?.bio || "",
      backgroundImage: auth.user?.backgroundImage || "",
      image: auth.user?.image || "",
    },
    onSubmit: handleSubmit,
  });

  const handleImageChange = async (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue(name, file);
    if (name === "image") {
      setSelectedImage(file);
    }
    setUploading(false);
  };
  
  // 2. Define a dynamic style object for the modal's Box based on the theme.
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: theme === 'dark' ? "#15202b" : "background.paper",
    color: theme === 'dark' ? "white" : "black",
    border: "none",
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: 4,
  };

  // 3. Define a dynamic style for TextFields
  const textFieldStyles = {
    "& .MuiInputBase-root": {
      color: theme === 'dark' ? 'white' : 'black',
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme === 'dark' ? '#555' : 'rgba(0, 0, 0, 0.23)',
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme === 'dark' ? '#888' : 'black',
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: '#1d9bf0',
      },
    },
    "& .MuiInputLabel-root": {
      color: theme === 'dark' ? 'gray' : 'rgba(0, 0, 0, 0.6)',
      "&.Mui-focused": {
        color: '#1d9bf0',
      }
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon sx={{ color: theme === 'dark' ? 'white' : 'black' }} />
                </IconButton>
                <p className="text-lg font-bold">Edit profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <React.Fragment>
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center"
                      src={formik.values.backgroundImage || auth.user?.backgroundImage || "https://c4.wallpaperflare.com/wallpaper/997/210/533/anime-attack-on-titan-attack-on-titan-levi-ackerman-wallpaper-preview.jpg"}
                      alt="background"
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      name="backgroundImage"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid",
                        borderColor: theme === 'dark' ? '#15202b' : 'white'
                      }}
                      src={selectedImage || auth.user?.image || ""}
                    />
                    <input
                      className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      name="image"
                      type="file"
                    />
                  </div>
                </div>
              </React.Fragment>
              <div className="space-y-3 px-2">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  sx={textFieldStyles}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  sx={textFieldStyles}
                />
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  sx={textFieldStyles}
                />
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  sx={textFieldStyles}
                />
                <div className="my-3">
                  <p className="text-lg">Birth date . Edit</p>
                  <p className="text-2xl">October 26, 1999</p>
                </div>
                <p className="py-3 text-lg">Edit professional Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
