package com.uday.social.media.platform.mapper;

import com.uday.social.media.platform.dto.LikeDto;
import com.uday.social.media.platform.dto.PostDto;
import com.uday.social.media.platform.dto.UserDto;
import com.uday.social.media.platform.model.Like;
import com.uday.social.media.platform.model.Post;
import com.uday.social.media.platform.model.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Like like, User reqUser){

        UserDto user=UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto=UserDtoMapper.toUserDto(reqUser);
        PostDto post=PostDtoMapper.toPostDto(like.getPost(),reqUser);

        LikeDto likeDto=new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setPost(post);
        likeDto.setUser(user);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like>likes,User reqUser){
        List<LikeDto>likeDtos=new ArrayList<>();

        for(Like like:likes){
            UserDto user=UserDtoMapper.toUserDto(like.getUser());
            PostDto post=PostDtoMapper.toPostDto(like.getPost(),reqUser);

            LikeDto likeDto=new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setPost(post);
            likeDto.setUser(user);
            likeDtos.add(likeDto);
        }
        return likeDtos;
    }

}
