package com.uday.SponsorConnect.controller;

import com.uday.SponsorConnect.config.JwtProvider;
import com.uday.SponsorConnect.model.User;
import com.uday.SponsorConnect.repository.UserRepository;
import com.uday.SponsorConnect.response.AuthResponse;
import com.uday.SponsorConnect.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());

        if (isEmailExist != null) {
            throw new Exception("email is already used with another account");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setFullName(user.getFullName());
        newUser.setLogin_with_google(false); // Set flag for standard signup

        User savedUser = userRepository.save(newUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(),
                null,
                customUserDetailsService.loadUserByUsername(savedUser.getEmail()).getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {
        String userName = user.getEmail();
        String password = user.getPassword();

        Authentication auth = authenticate(userName, password);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());
        Authentication auth;

        if (isEmailExist != null) {
            // If user exists, create Authentication object directly.
            auth = new UsernamePasswordAuthenticationToken(
                    isEmailExist.getEmail(),
                    null,
                    Collections.emptyList() // Provide empty authorities
            );

        } else {
            // If user does not exist, create a new one.
            User newUser = new User();
            newUser.setEmail(user.getEmail());
            String randomPassword = java.util.UUID.randomUUID().toString();
            newUser.setPassword(passwordEncoder.encode(randomPassword));
            newUser.setFullName(user.getFullName());
            newUser.setImage(user.getImage());
            newUser.setLogin_with_google(true);

            // FIX: Set default empty values for potentially NOT NULL fields to prevent database errors.
            newUser.setBio("");
            newUser.setLocation("");
            newUser.setWebsite("");
            newUser.setBirthDate("");

            User savedUser = userRepository.save(newUser);

            auth = new UsernamePasswordAuthenticationToken(
                    savedUser.getEmail(),
                    null,
                    Collections.emptyList() // Provide empty authorities
            );
        }

        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = JwtProvider.generateToken(auth);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    private Authentication authenticate(String userName, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid UserName");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
