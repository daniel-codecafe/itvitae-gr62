package com.jorisvanbreugel.les3.repositories;

import com.jorisvanbreugel.les3.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
