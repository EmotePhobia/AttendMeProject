/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Student } from './Student';
import type { Teacher } from './Teacher';
export type User = {
    userId?: number;
    loginName?: string;
    name?: string | null;
    surname?: string | null;
    studentId?: number | null;
    teacherId?: number | null;
    student?: Student;
    readonly isStudent?: boolean;
    teacher?: Teacher;
    readonly isTeacher?: boolean;
    readonly dateCreated?: string;
    deviceName?: string | null;
    isAdmin?: boolean;
};

