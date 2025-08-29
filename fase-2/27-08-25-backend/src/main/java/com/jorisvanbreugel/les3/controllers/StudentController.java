package com.jorisvanbreugel.les3.controllers;

import ch.qos.logback.classic.boolex.StubEventEvaluator;
import com.jorisvanbreugel.les3.models.Course;
import com.jorisvanbreugel.les3.models.Student;
import com.jorisvanbreugel.les3.services.StudentService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(@Autowired StudentService studentService) {
        this.studentService = studentService;
    }

    @PostConstruct
    public void createDummyData() {
        studentService.createStudent(new Student("Jan"));
        studentService.createStudent(new Student("Joris"));
        studentService.createStudent(new Student("Daniel"));
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        var students = studentService.findAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        var result = studentService.createStudent(student);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
}
