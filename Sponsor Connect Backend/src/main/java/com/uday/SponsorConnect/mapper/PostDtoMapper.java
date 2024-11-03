package com.uday.SponsorConnect.mapper;

import com.uday.SponsorConnect.model.Post;
import com.uday.SponsorConnect.model.User;
import com.uday.SponsorConnect.utils.PostUtil;
import com.uday.SponsorConnect.dto.PostDto;
import com.uday.SponsorConnect.dto.UserDto;

import java.util.ArrayList;
import java.util.List;

public class PostDtoMapper {

    public static PostDto toPostDto(Post post, User reqUser){

        UserDto user=UserDtoMapper.toUserDto(post.getUser());

        boolean isLiked= PostUtil.isLikedByReqUser(reqUser,post);
        boolean isRePosted=PostUtil.isRePostedByReqUser(reqUser,post);

        List<Long>rePostUserId=new ArrayList<>();

        for(User user1:post.getRePostUser()){
            rePostUserId.add(user1.getId());
        }

        PostDto postDto=new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPosts().size());
        postDto.setTotalRePosts(post.getRePostUser().size());
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setRePost(isRePosted);
        postDto.setRePostUsersId(rePostUserId);
        postDto.setReplyPost(toPostDtos(post.getReplyPosts(),reqUser));
        postDto.setVideo(post.getVideo());
        return postDto;
    }

    public static List<PostDto> toPostDtos(List<Post>posts,User reqUser){
        List<PostDto>postDtos=new ArrayList<>();

        for(Post post:posts){
            PostDto postDto=toReplyPostDto(post,reqUser);
            postDtos.add(postDto);
        }
        return postDtos;
    }

    private static PostDto toReplyPostDto(Post post, User reqUser) {

        UserDto user=UserDtoMapper.toUserDto(post.getUser());

        boolean isLiked= PostUtil.isLikedByReqUser(reqUser,post);
        boolean isRePosted=PostUtil.isRePostedByReqUser(reqUser,post);

        List<Long>rePostUserId=new ArrayList<>();

        for(User user1:post.getRePostUser()){
            rePostUserId.add(user1.getId());
        }

        PostDto postDto=new PostDto();
        postDto.setId(post.getId());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());
        postDto.setImage(post.getImage());
        postDto.setTotalLikes(post.getLikes().size());
        postDto.setTotalReplies(post.getReplyPosts().size());
        postDto.setTotalRePosts(post.getRePostUser().size());
        postDto.setUser(user);
        postDto.setLiked(isLiked);
        postDto.setRePost(isRePosted);
        postDto.setRePostUsersId(rePostUserId);
        postDto.setVideo(post.getVideo());
        return postDto;
    }
}
