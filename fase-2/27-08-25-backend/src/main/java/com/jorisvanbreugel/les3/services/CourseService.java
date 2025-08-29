package com.jorisvanbreugel.les3.services;

import com.jorisvanbreugel.les3.exceptions.StudentAlreadyAssignedException;
import com.jorisvanbreugel.les3.models.Course;
import com.jorisvanbreugel.les3.models.Student;
import com.jorisvanbreugel.les3.repositories.CourseRepository;
import com.jorisvanbreugel.les3.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    final private CourseRepository courseRepository;
    final private StudentRepository studentRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository, StudentRepository studentRepository) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourse(Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);

        if (course.isEmpty()) {
            throw new RuntimeException("Deze course bestaat niet!");
        }

        return course.get();
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getByName(String name) {
        return courseRepository.findAllByName(name);
    }

    public Course enrollStudent(Long courseId, Long studentId) {
        // Data ophalen
        Student student = studentRepository.findById(studentId).get();
        Course course = courseRepository.findById(courseId).get();

        // Logica validatie
        if (course.getStudents().contains(student)) {
            throw new StudentAlreadyAssignedException();
        }

        if (course.isCourseFull()) {
            throw new RuntimeException("Deze course zit vol!");
        }

        // Data aanpassen
        course.addStudent(student);
        student.addCourse(course);

        // Data opslaan (+ terugsturen)
        // Course result = courseRepository.save(course);
        // return result;
        return courseRepository.save(course);
    }
}
