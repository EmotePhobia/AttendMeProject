/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttendanceLog } from './AttendanceLog';
import type { CourseGroup } from './CourseGroup';
export type CourseSession = {
    courseSessionId?: number;
    courseGroupId?: number;
    courseGroup?: CourseGroup;
    locationName?: string;
    dateStart?: string;
    dateEnd?: string;
    readonly dateCreated?: string;
    attendanceLogs?: Array<AttendanceLog>;
};

