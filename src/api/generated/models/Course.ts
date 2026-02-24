/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseGroup } from './CourseGroup';
export type Course = {
    courseId?: number;
    courseName?: string;
    courseDescription?: string;
    readonly dateCreated?: string;
    courseGroups?: Array<CourseGroup> | null;
};

