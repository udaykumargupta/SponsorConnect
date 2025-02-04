import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import PostCard from "./PostCard";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../../Store/Post/Action";
import { uploadToCloudnary } from "../../utils/uploadToCloudnary";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store);

  const handleSubmit = (values,actions) => {
    dispatch(createPost(values));
    actions.resetForm();
    console.log("values", values);
    setSelectedImage("");
  };
  useEffect(() => {
    dispatch(getAllPosts());
  }, [post.like, post.repost]);
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isPost: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-2 text-x1 font-bold opacity-90"></h1>
      </section>
      <section className={"pb-10"}>
        <div className="flex space-x-5">
          <Avatar alt="username" src=""></Avatar>
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="Start a post"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-100 text-sm w-full bg-transparent"
                  {...formik.getFieldProps("content")}
                ></input>
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
                <div className="flex justify-between items-center mt-5">
                  <div className="flex space-x-5 items-center">
                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                      <PermMediaIcon className="text-[#b06b39]"></PermMediaIcon>
                      <input
                        type="file"
                        name="imageFile"
                        className="hidden"
                        onChange={handleSelectImage}
                      />
                    </label>
                    <FmdGoodIcon className="text-[#d438c2]"></FmdGoodIcon>
                    <TagFacesIcon className="text-[#1d9bf0]"></TagFacesIcon>
                  </div>
                  <div>
                    <Button
                      sx={{
                        width: "100%",
                        borderRadius: "10px",
                        paddingY: "8px",
                        paddingX: "20px",
                        bgcolor: "##007bf",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </form>
            <div>{selectImage && <img src={selectImage} alt="" />}</div>
          </div>
        </div>
      </section>
      <section>
        {post.posts.map((item) => (
          <PostCard item={item} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection;
