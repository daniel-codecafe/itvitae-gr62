package com.jorisvanbreugel.les3.mappers;

import com.jorisvanbreugel.les3.dto.CourseCreateDTO;
import com.jorisvanbreugel.les3.dto.CourseResponseDTO;
import com.jorisvanbreugel.les3.models.Course;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CourseMapper {

    public Course toCourse(CourseCreateDTO courseDto)  {
        Course course = new Course();
        course.setName(courseDto.name());
        return course;
    }

    public Course toCourse(CourseResponseDTO courseDto)  {
        Course course = new Course();
        course.setName(courseDto.name());
        return course;
    }


    public CourseResponseDTO toResponseDTO(Course course) {
        return new CourseResponseDTO(
                course.getId(), course.getName()
        );
    }

    public CourseCreateDTO toCreateDTO(Course course) {
        return new CourseCreateDTO(
                course.getName()
        );
    }

    public List<CourseResponseDTO> toResponseListDTO(List<Course> courses) {
        return courses.stream().map(this::toResponseDTO).toList();
    }
}
