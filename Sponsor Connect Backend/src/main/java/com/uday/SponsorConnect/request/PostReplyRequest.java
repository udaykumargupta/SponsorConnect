package com.uday.SponsorConnect.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostReplyRequest {

    private String content;
    private Long PostId;
    private LocalDateTime createdAt;
    private String image;
}
