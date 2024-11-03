package com.uday.SponsorConnect.service;

import com.uday.SponsorConnect.config.JwtProvider;
import com.uday.SponsorConnect.model.User;
import com.uday.SponsorConnect.repository.UserRepository;
import com.uday.SponsorConnect.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService  {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws UserException {

        User user=userRepository.findById(userId) .orElseThrow(()->new UserException("user not found"+userId));
        return user;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {

        String email=jwtProvider.getEmailFromToken(jwt);
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new UserException(" user not found with email"+email);
        }
        return user;
    }

    @Override
    public User updateUser(Long userId, User user) throws UserException {
        User user1=findUserById(userId);

        if(user.getFullName()!=null){
            user1.setFullName(user.getFullName());
        }
        if(user.getBackgroundImage()!=null){
            user1.setBackgroundImage(user.getBackgroundImage());
        }
        if(user.getBirthDate()!=null){
            user1.setBirthDate(user.getBirthDate());
        }
        if(user.getBio()!=null){
            user1.setBio(user.getBio());
        }
        if(user.getWebsite()!=null){
            user1.setWebsite(user.getWebsite());
        }

        return userRepository.save(user);
    }

    @Override
    public User followUser(Long userId, User user) throws UserException {
        User followToUser=findUserById(userId);


        if(user.getFollowings().contains(followToUser) && followToUser.getFollowings().contains(user)){
            user.getFollowings().remove(followToUser);
            followToUser.getFollowers().remove(user);
        }
        else{
            user.getFollowings().add(followToUser);
            followToUser.getFollowers().add(user);
        }
        userRepository.save(followToUser);
        userRepository.save(user);
        return followToUser;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }
}
