import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PostCard from "../HomeSection/PostCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findPostsById } from "../../Store/Post/Action";


const PostDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch=useDispatch();

  const {id}=useParams()
  const {post}=useSelector(store=>store)
  useEffect(()=>{
    if(id){
      dispatch(findPostsById(id))
    }
  },[])
  return (
    <React.Fragment>
      <section className={"bg-white z-50 flex items-center sticky top-0 bg-opacity-95"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Post</h1>
      </section>
      <section>
        <PostCard item={post?.post}>

        </PostCard>
        <Divider sx={{margin:"2rem 0rem"}}>

        </Divider>

      </section>
      <section>
        {post?.post?.replyPost?.map((item)=><PostCard item={item}/>)}
      </section>
    </React.Fragment>
  );
};

export default PostDetails;
