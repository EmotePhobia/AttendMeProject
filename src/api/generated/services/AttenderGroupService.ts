/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttenderGroup } from '../models/AttenderGroup';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AttenderGroupService {
    /**
     * @param requestBody
     * @returns AttenderGroup Success
     * @throws ApiError
     */
    public static postAttendergroupSave(
        requestBody?: AttenderGroup,
    ): CancelablePromise<AttenderGroup> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/attendergroup/save',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param attenderGroupId
     * @param userId
     * @returns AttenderGroup Success
     * @throws ApiError
     */
    public static postAttendergroupMemberAdd(
        attenderGroupId?: number,
        userId?: number,
    ): CancelablePromise<AttenderGroup> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/attendergroup/member/add',
            query: {
                'attenderGroupId': attenderGroupId,
                'userId': userId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
}
