/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-09-12 15:03:51.

export interface CourseCreateDTO {
    name: string;
    maxStudents: number;
}

export interface CourseDTO {
    id: number;
    name: string;
    maxStudents: number;
    students: StudentSummaryDTO[];
}

export interface CourseSummaryDTO {
    id: number;
    name: string;
    maxStudents: number;
}

export interface CourseUpdateDTO {
    name: string;
    maxStudents: number;
}

export interface StudentCreateDTO {
    name: string;
    age: number;
}

export interface StudentDTO {
    id: number;
    name: string;
    age: number;
    courses: CourseSummaryDTO[];
}

export interface StudentSummaryDTO {
    id: number;
    name: string;
    age: number;
}

export interface StudentUpdateDTO {
    name: string;
    age: number;
}
