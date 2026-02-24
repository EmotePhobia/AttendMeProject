/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from './Course';
import type { CourseGroupAttenderGroupAssigment } from './CourseGroupAttenderGroupAssigment';
import type { CourseGroupUserAssigment } from './CourseGroupUserAssigment';
import type { CourseSession } from './CourseSession';
import type { User } from './User';
export type CourseGroup = {
    courseGroupId?: number;
    courseId?: number;
    course?: Course;
    courseGroupType?: string;
    courseGroupName?: string;
    courseGroupDescription?: string | null;
    teacherUserId?: number | null;
    teacherUser?: User;
    sessions?: Array<CourseSession> | null;
    attenderGroupAssigments?: Array<CourseGroupAttenderGroupAssigment> | null;
    userAssigments?: Array<CourseGroupUserAssigment> | null;
    yearOfStudy?: number;
    semesterCode?: string | null;
    dateStart?: string;
    dateEnd?: string;
    readonly dateCreated?: string;
};

