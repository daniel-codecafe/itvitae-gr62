package com.jorisvanbreugel.les3.exceptions;

public class StudentAlreadyAssignedException extends RuntimeException {

    public StudentAlreadyAssignedException() {
        super("Deze student is al aangemeld voor deze course");
    }
}
