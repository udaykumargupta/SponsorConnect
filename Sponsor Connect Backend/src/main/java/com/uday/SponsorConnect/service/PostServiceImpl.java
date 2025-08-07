package com.uday.SponsorConnect.service;

import com.uday.SponsorConnect.model.Post;
import com.uday.SponsorConnect.model.User;
import com.uday.SponsorConnect.exception.PostException;
import com.uday.SponsorConnect.exception.UserException;
import com.uday.SponsorConnect.repository.PostRepository;
import com.uday.SponsorConnect.request.PostReplyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post req, User user) throws UserException {

        Post post=new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(false);
        post.setPost(true);
        post.setVideo(req.getVideo());

        return postRepository.save(post);
    }

    @Override
    public List<Post> findAllPost() {


        return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
    }

    @Override
    public Post rePost(Long postId, User user) throws UserException, PostException {

        Post post=findById(postId);

        if(post.getRePostUser().contains(user)){
            post.getRePostUser().remove(user);
        }
        else{
            post.getRePostUser().add(user);
        }
        return postRepository.save(post);
    }

    @Override
    public Post findById(Long postId) throws PostException {

        Post post=postRepository.findById(postId)
                .orElseThrow(()->new PostException("Post not found with id "+ postId));
        return post;
    }

    @Override
    public void deletePostById(Long postId, Long userId) throws PostException, UserException {
            Post post =findById(postId);

            if(!userId.equals(post.getUser().getId())){
                throw new UserException("You cant delete another user's post");
            }
            postRepository.deleteById(post.getId());
    }

    @Override
    public Post removeFromRepost(Long PostId, User user) throws PostException, UserException {
        return null;
    }

    @Override
    public Post createdReply(PostReplyRequest req, User user) throws PostException {

        Post replyFor=findById(req.getPostId());
        Post post=new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setImage(req.getImage());
        post.setUser(user);
        post.setReply(true);
        post.setPost(false);
        post.setReplyFor(replyFor);

        Post savedReply=postRepository.save(post);

//       post.getReplyPosts().add(savedReply);
        replyFor.getReplyPosts().add(savedReply);
        postRepository.save(replyFor);
        return replyFor;
    }

    @Override
    public List<Post> getUserPost(User user) {


        return postRepository.findByRePostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Post> findByLikesContainsUser(User user) {
        return postRepository.findByLikesUser_Id(user.getId());
    }
}
