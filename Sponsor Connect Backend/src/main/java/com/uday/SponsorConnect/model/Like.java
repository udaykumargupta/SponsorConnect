package com.uday.SponsorConnect.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;
}
