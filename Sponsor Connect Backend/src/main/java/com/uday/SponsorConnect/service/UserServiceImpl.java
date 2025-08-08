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

    // In UserServiceImpl.java

    @Override
    public User updateUser(Long userId, User req) throws UserException {
        User userToUpdate = findUserById(userId);

        if(req.getFullName() != null){
            userToUpdate.setFullName(req.getFullName());
        }
        if(req.getImage() != null) { // Make sure you also have a check for the profile image
            userToUpdate.setImage(req.getImage());
        }
        if(req.getBackgroundImage() != null){
            userToUpdate.setBackgroundImage(req.getBackgroundImage());
        }
        if(req.getBirthDate() != null){
            userToUpdate.setBirthDate(req.getBirthDate());
        }
        if(req.getBio() != null){
            userToUpdate.setBio(req.getBio());
        }
        if(req.getWebsite() != null){
            userToUpdate.setWebsite(req.getWebsite());
        }
        if(req.getLocation() != null) { // Add a check for location as well
            userToUpdate.setLocation(req.getLocation());
        }

        // Save the CORRECT, fully updated user object
        return userRepository.save(userToUpdate);
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
        // The repository query now handles the wildcards correctly.
        return userRepository.searchUser(query);
    }
}
