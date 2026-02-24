/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttenderGroup } from './AttenderGroup';
import type { User } from './User';
export type AttenderGroupMember = {
    attenderGroupMemberId?: number;
    memberUserId?: number;
    memberUser?: User;
    attenderGroupId?: number;
    attenderGroup?: AttenderGroup;
    readonly dateCreated?: string;
};

