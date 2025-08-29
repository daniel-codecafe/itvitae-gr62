package com.daniel.relations.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Parent {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "parents")
    private List<Child> children;
}
