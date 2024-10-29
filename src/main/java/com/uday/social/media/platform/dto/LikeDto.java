package com.uday.social.media.platform.dto;

import lombok.Data;

@Data
public class LikeDto{

    private Long id;
    private UserDto user;
    private PostDto post;
}
