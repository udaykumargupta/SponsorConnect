package com.uday.social.media.platform.controller;

import com.uday.social.media.platform.dto.LikeDto;
import com.uday.social.media.platform.exception.PostException;
import com.uday.social.media.platform.exception.UserException;
import com.uday.social.media.platform.mapper.LikeDtoMapper;
import com.uday.social.media.platform.model.Like;
import com.uday.social.media.platform.model.User;
import com.uday.social.media.platform.service.LikeService;
import com.uday.social.media.platform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{postId}/likes")
    public ResponseEntity<LikeDto> likePost(@PathVariable Long postId,
                                            @RequestHeader("Authorization") String jwt)
            throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likePost(postId, user);
        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);

        return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);
    }


    @PostMapping("/post/{postId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long postId,
                                                    @RequestHeader("Authorization") String jwt)
            throws UserException, PostException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Like> likes = likeService.getAllLikes(postId);
        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }

}
