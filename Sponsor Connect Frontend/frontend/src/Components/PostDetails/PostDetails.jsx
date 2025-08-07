import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../HomeSection/PostCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findPostsById } from "../../Store/Post/Action";

// 1. Accept `theme` as a prop
const PostDetails = ({ theme }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { post } = useSelector(store => store);

  useEffect(() => {
    if (id) {
      dispatch(findPostsById(id));
    }
  }, [id, dispatch]);

  return (
    // 2. Apply theme to the root container
    <React.Fragment>
      <section className={"bg-white dark:bg-[#15202b] z-50 flex items-center sticky top-0 bg-opacity-95"}>
        {/* 3. Update icon and text colors */}
        <KeyboardBackspaceIcon
          className="cursor-pointer text-gray-800 dark:text-white"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5 text-gray-800 dark:text-white">Post</h1>
      </section>
      <section className="bg-white dark:bg-[#15202b]">
        {/* 4. Pass the theme prop down to the main PostCard */}
        <PostCard item={post?.post} theme={theme} />
        <Divider sx={{ margin: "2rem 0rem", borderColor: theme === 'dark' ? '#38444d' : 'divider' }} />
      </section>
      <section className="bg-white dark:bg-[#15202b]">
        {/* 5. Pass the theme prop down to the reply PostCards */}
        {post?.post?.replyPost?.map((item) => (
          <PostCard key={item.id} item={item} theme={theme} />
        ))}
      </section>
    </React.Fragment>
  );
};

export default PostDetails;
