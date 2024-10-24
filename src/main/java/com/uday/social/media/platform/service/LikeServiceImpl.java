package com.uday.social.media.platform.service;

import com.uday.social.media.platform.exception.PostException;
import com.uday.social.media.platform.exception.UserException;
import com.uday.social.media.platform.model.Like;
import com.uday.social.media.platform.model.Post;
import com.uday.social.media.platform.model.User;
import com.uday.social.media.platform.repository.LikeRepository;
import com.uday.social.media.platform.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Like likePost(Long postId, User user) throws UserException, PostException {

        Like isLikeExist=likeRepository.isLikeExist(user.getId(),postId);

        if(isLikeExist!=null){
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }
        Post post=postService.findById(postId);

        Like like=new Like();
        like.setPost(post);
        like.setUser(user);

        Like savedLike=likeRepository.save(like);

        post.getLikes().add(savedLike);
        postRepository.save(post);

        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long postId) throws PostException {

        Post post=postService.findById(postId);

        List<Like>likes=likeRepository.findByPostId(postId);
        return likes;
    }
}
