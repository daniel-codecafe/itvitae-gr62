package com.jorisvanbreugel.les3.repositories;

import com.jorisvanbreugel.les3.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
     List<Course> findAllByName(String name);
}
