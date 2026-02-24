/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttenderGroupMember } from './AttenderGroupMember';
export type AttenderGroup = {
    attenderGroupId?: number;
    groupName?: string;
    yearOfStudy?: number;
    studyDirection?: string;
    readonly dateCreated?: string;
    attenderGroupMembers?: Array<AttenderGroupMember> | null;
};

