package com.uday.social.media.platform.service;

import com.uday.social.media.platform.exception.PostException;
import com.uday.social.media.platform.exception.UserException;
import com.uday.social.media.platform.model.Like;
import com.uday.social.media.platform.model.User;

import java.util.List;

public interface LikeService {

    public Like likePost(Long postId, User user) throws UserException, PostException;

    public List<Like> getAllLikes(Long postId) throws PostException;
}
