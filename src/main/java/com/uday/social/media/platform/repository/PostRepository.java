package com.uday.social.media.platform.repository;

import com.uday.social.media.platform.model.Post;
import com.uday.social.media.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

    List<Post>findByRePostUserContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(User user,Long userId);


    List<Post>findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("Select from Post p JSON p.like l where l.user.id=userId")
    List<Post>findByLikesUser_Id(Long userId);


}
