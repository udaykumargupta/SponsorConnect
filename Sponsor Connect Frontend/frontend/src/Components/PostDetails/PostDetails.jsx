import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import PostCard from "../HomeSection/PostCard";
import { Divider } from "@mui/material";
import { Margin } from "@mui/icons-material";

const PostDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
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
        <PostCard>

        </PostCard>
        <Divider sx={{margin:"2rem 0rem"}}>

        </Divider>

      </section>
      <section>
        {[1,1,1,1].map((item)=><PostCard/>)}
      </section>
    </React.Fragment>
  );
};

export default PostDetails;
