package com.uday.social.media.platform.utils;

import com.uday.social.media.platform.model.Like;
import com.uday.social.media.platform.model.Post;
import com.uday.social.media.platform.model.User;

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
