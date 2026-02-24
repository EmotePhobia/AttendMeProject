/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttenderGroup } from './AttenderGroup';
import type { CourseGroup } from './CourseGroup';
export type CourseGroupAttenderGroupAssigment = {
    courseGroupAttenderGroupAssigmentId?: number;
    courseGroupId?: number;
    attenderGroupId?: number | null;
    isExcluded?: boolean;
    readonly dateCreated?: string;
    courseGroup?: CourseGroup;
    attenderGroup?: AttenderGroup;
};

