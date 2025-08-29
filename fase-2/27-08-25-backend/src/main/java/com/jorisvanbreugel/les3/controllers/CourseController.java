package com.jorisvanbreugel.les3.controllers;

import com.jorisvanbreugel.les3.dto.CourseCreateDTO;
import com.jorisvanbreugel.les3.dto.CourseResponseDTO;
import com.jorisvanbreugel.les3.mappers.CourseMapper;
import com.jorisvanbreugel.les3.models.Course;
import com.jorisvanbreugel.les3.services.CourseService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {
    final private CourseService courseService;
    final private CourseMapper courseMapper;

    @Autowired
    public CourseController(CourseService courseService, CourseMapper courseMapper) {
        this.courseService = courseService;
        this.courseMapper = courseMapper;
    }

    @PostConstruct
    public void createDummyData() {
        courseService.createCourse(new Course("Biologie"));
        courseService.createCourse(new Course("Geschiedenis"));
        courseService.createCourse(new Course("Wiskunde"));
        courseService.createCourse(new Course("Scheikunde"));
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@Valid @RequestBody CourseCreateDTO course) {
        Course newCourse = new Course(course.name());
        Course result = courseService.createCourse(newCourse);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponseDTO> getCourse(@PathVariable Long courseId) {
        Course result = courseService.getCourse(courseId);
        return new ResponseEntity<>(courseMapper.toResponseDTO(result), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CourseResponseDTO>> getCourses(
            @RequestParam(name = "name", required = false) String name) {
        List<Course> result;

        System.out.println(name);

        if (name == null || name.isEmpty()) {
            result = courseService.getAllCourses();
        } else {
            result = courseService.getByName(name);
        }

//        List<CourseResponseDTO> courseResponses = new ArrayList<>();
//
//        for (Course course : result) {
//            courseResponses.add(CourseMapper.toDTO(course));
//        }

        List<CourseResponseDTO> courseResponses = result.stream().map(courseMapper::toResponseDTO).toList();
        return new ResponseEntity<>(courseResponses, HttpStatus.OK);

//        return new ResponseEntity<>(courseMapper.toResponseListDTO(result), HttpStatus.OK);
    }



    @PutMapping("/{courseId}/enroll/{studentId}")
    public ResponseEntity<Course> enroll(@PathVariable Long courseId, @PathVariable Long studentId) {
        Course result = courseService.enrollStudent(courseId, studentId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
