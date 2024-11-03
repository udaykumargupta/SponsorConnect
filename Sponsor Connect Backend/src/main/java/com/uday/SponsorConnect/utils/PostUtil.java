package com.uday.SponsorConnect.utils;

import com.uday.SponsorConnect.model.Like;
import com.uday.SponsorConnect.model.Post;
import com.uday.SponsorConnect.model.User;

public class PostUtil {

    public final static boolean isLikedByReqUser(User reqUser, Post post){

        for(Like like:post.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;

    }
    public final static boolean isRePostedByReqUser(User reqUser , Post post){
        for(User user:post.getRePostUser()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
