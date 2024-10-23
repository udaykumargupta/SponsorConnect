package com.uday.social.media.platform.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private String content;

    @OneToMany(mappedBy = "post",cascade =CascadeType.ALL)
    private List<Like>likes=new ArrayList<>();

    @OneToMany
    private List<Post> replyPosts=new ArrayList<>();

    @ManyToMany
    private List<User>rePostUser=new ArrayList<>();

    @ManyToOne
    private Post replyFor;


    private String image;
    private String video;

    private boolean isReply;
    private boolean isPost;


}
