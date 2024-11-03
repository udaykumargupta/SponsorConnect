package com.uday.social.media.platform.service;

import com.uday.social.media.platform.exception.PostException;
import com.uday.social.media.platform.exception.UserException;
import com.uday.social.media.platform.model.Post;
import com.uday.social.media.platform.model.User;
import com.uday.social.media.platform.request.PostReplyRequest;

import java.util.List;

public interface PostService {

    public Post createPost(Post req , User user)throws UserException;

    public List<Post> findAllPost();

    public Post rePost(Long postId,User user)throws UserException, PostException;

    public Post findById(Long postId) throws PostException;

    public void deletePostById(Long postId ,Long userId) throws PostException ,UserException;

    public Post removeFromRepost(Long postId,User user) throws PostException ,UserException;

    public Post createdReply(PostReplyRequest req, User user) throws PostException;

    public List<Post>getUserPost(User user);

    public List<Post>findByLikesContainsUser(User user);


}
