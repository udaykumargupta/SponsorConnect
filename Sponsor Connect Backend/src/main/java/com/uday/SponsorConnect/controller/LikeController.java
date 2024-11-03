package com.uday.SponsorConnect.controller;

import com.uday.SponsorConnect.model.Like;
import com.uday.SponsorConnect.model.User;
import com.uday.SponsorConnect.dto.LikeDto;
import com.uday.SponsorConnect.exception.PostException;
import com.uday.SponsorConnect.exception.UserException;
import com.uday.SponsorConnect.mapper.LikeDtoMapper;
import com.uday.SponsorConnect.service.LikeService;
import com.uday.SponsorConnect.service.UserService;
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
