import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostReply } from '../../Store/Post/Action';
import { uploadToCloudnary } from '../../utils/uploadToCloudnary';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:"none",
  borderRadius:4
};

export default function ReplyModal({handleClose,open,item}) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit=(values)=>{
    dispatch(createPostReply(values));
    handleClose();
    console.log("handle submit",values);
  }
  const formik=useFormik(
    {
      initialValues:{
        content:"",
        image:"",
        postId:item?.id,
      },
      onSubmit:handleSubmit
    })
    const handleSelectImage = (event) => {
      setUploadingImage(true);
      const imgUrl = event.target.files[0];
      formik.setFieldValue("image", imgUrl);
      setSelectedImage(imgUrl);
      setUploadingImage(false);
    };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="flex space-x-5">
        <Avatar
          className="cursor-pointer"
          onClose={() => navigate(`/profile/${6}`)}
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
          </div>
          <div className="mt-2">
            <div  onClick={()=>navigate('/post/${3}')}className="cursor-pointer">
              <p className="mb-2 p-0">
                Sponsor Connect-Full Stack project with spring boot and react
              </p>
            </div>
        </div>
      </div>

    </div>
    <section className={"py-10"}>
        <div className="flex space-x-5">
          <Avatar alt="username" src=""></Avatar>
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="what is happening"
                  className={"border-none outline-none text-x1 bg-transparent"}
                  {...formik.getFieldProps("content")}
                ></input>
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
                {/* <div>
                <img src="" alt=""/>
              </div> */}
                <div className="flex justify-between items-center mt-5">
                  <div className="flex space-x-5 items-center">
                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                      <ImageIcon className="text-[#1d9df0]"></ImageIcon>
                      <input
                        type="file"
                        name="imageFile"
                        className="hidden"
                        onChange={handleSelectImage}
                      />
                    </label>
                    <FmdGoodIcon className="text-[#1d9bf0]"></FmdGoodIcon>
                    <TagFacesIcon className="text-[#1d9bf0]"></TagFacesIcon>
                  </div>
                  <div>
                    <Button
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        paddingY: "8px",
                        paddingX: "20px",
                        bgcolor: "#1e88e5",
                      }}
                      variant="contained"
                      type='submit'
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
        </Box>
      </Modal>
    </div>
  );
}