package com.uday.SponsorConnect.service;

import com.uday.SponsorConnect.model.Like;
import com.uday.SponsorConnect.model.User;
import com.uday.SponsorConnect.exception.PostException;
import com.uday.SponsorConnect.exception.UserException;

import java.util.List;

public interface LikeService {

    public Like likePost(Long postId, User user) throws UserException, PostException;

    public List<Like> getAllLikes(Long postId) throws PostException;
}
