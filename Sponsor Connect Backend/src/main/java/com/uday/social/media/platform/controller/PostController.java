package com.uday.social.media.platform.controller;


import com.uday.social.media.platform.dto.PostDto;
import com.uday.social.media.platform.exception.PostException;
import com.uday.social.media.platform.exception.UserException;
import com.uday.social.media.platform.mapper.PostDtoMapper;
import com.uday.social.media.platform.model.Post;
import com.uday.social.media.platform.model.User;
import com.uday.social.media.platform.request.PostReplyRequest;
import com.uday.social.media.platform.response.ApiResponse;
import com.uday.social.media.platform.service.PostService;
import com.uday.social.media.platform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<PostDto>createPost(@RequestBody Post req,
                                             @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        Post post=postService.createPost(req,user);

        PostDto postDto= PostDtoMapper.toPostDto(post,user);
        return  new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<PostDto>replyPost(@RequestBody PostReplyRequest req,
                                             @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        Post post=postService.createdReply(req,user);

        PostDto postDto= PostDtoMapper.toPostDto(post,user);
        return  new ResponseEntity<>(postDto, HttpStatus.CREATED);
    }


    @PutMapping("/{postId}/repost")
    public ResponseEntity<PostDto>repost(@PathVariable Long postId,
                                            @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        Post post=postService.rePost(postId,user);

        PostDto postDto= PostDtoMapper.toPostDto(post,user);
        return  new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto>findPosById(@PathVariable Long postId,
                                         @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        Post post=postService.findById(postId);

        PostDto postDto= PostDtoMapper.toPostDto(post,user);
        return  new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse>deletePost(@PathVariable Long postId,
                                         @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        postService.deletePostById(postId, user.getId());

        ApiResponse res=new ApiResponse();
        res.setMessage("Post deleted Successfully");
        res.setStatus(true);
        return  new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<PostDto>>getAllPosts(
                                              @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        List<Post> post=postService.findAllPost();

        List<PostDto> postDtos= PostDtoMapper.toPostDtos(post,user);
        return  new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>>getUsersAllPosts(@PathVariable Long userId,
            @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        List<Post> post=postService.getUserPost(user);

        List<PostDto> postDtos= PostDtoMapper.toPostDtos(post,user);
        return  new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<PostDto>>findPostByLikesContainsUser(@PathVariable Long userId,
                                                         @RequestHeader("Authorization")String jwt) throws UserException, PostException{

        User user=userService.findUserProfileByJwt(jwt);

        List<Post> post=postService.findByLikesContainsUser(user);

        List<PostDto> postDtos= PostDtoMapper.toPostDtos(post,user);
        return  new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

}
