package com.jorisvanbreugel.les3.exceptions;

import com.jorisvanbreugel.les3.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> exceptionHandler(MethodArgumentNotValidException e) {

        StringBuilder stringBuilder = new StringBuilder("Fouten in de validatie:\n");
        for (ObjectError error : e.getBindingResult().getAllErrors()) {
            stringBuilder.append(error.getDefaultMessage());
        }

        return new ResponseEntity<>(new ErrorDTO(stringBuilder.toString()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(StudentAlreadyAssignedException.class)
    public ResponseEntity<ErrorDTO> exceptionHandler(StudentAlreadyAssignedException e) {
        return new ResponseEntity<>(new ErrorDTO(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDTO> exceptionHandler(RuntimeException e) {
        return new ResponseEntity<>(new ErrorDTO("Het gaat fout."), HttpStatus.BAD_REQUEST);
    }
}
