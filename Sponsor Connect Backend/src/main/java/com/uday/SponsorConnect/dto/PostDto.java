package com.uday.SponsorConnect.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDto {

    private Long id;

    private String content;

    private String image;

    private String video;

    private UserDto user;

    private LocalDateTime createdAt;

    private int totalLikes;

    private int totalReplies;

    private int totalRePosts;

    private boolean isLiked;

    private boolean isRePost;

    private List<Long>rePostUsersId;

    private List<PostDto>replyPost;




}
