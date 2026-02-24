/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseGroup } from './CourseGroup';
import type { User } from './User';
export type CourseGroupUserAssigment = {
    courseGroupUserAssigmentId?: number;
    courseGroupId?: number;
    courseGroup?: CourseGroup;
    userId?: number | null;
    readonly dateCreated?: string;
    isExcluded?: boolean;
    user?: User;
};

