package com.uday.SponsorConnect.repository;

import com.uday.SponsorConnect.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like,Long> {

    @Query("SELECT l FROM Like l WHERE l.user.id=:userId AND l.post.id=:postId")
    public Like isLikeExist(@Param("userId")Long userId,@Param("postId")Long postId);

    @Query("SELECT l FROM Like l where l.post.id=:postId")
    public List<Like>findByPostId(@Param("postId")Long postId);

}
