/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttendanceLog } from '../models/AttendanceLog';
import type { Course } from '../models/Course';
import type { CourseGroup } from '../models/CourseGroup';
import type { CourseSession } from '../models/CourseSession';
import type { CourseSessionAttendanceRecord } from '../models/CourseSessionAttendanceRecord';
import type { CourseSessionListFiltersPagedListParams } from '../models/CourseSessionListFiltersPagedListParams';
import type { CourseSessionListItem } from '../models/CourseSessionListItem';
import type { CourseSessionListItemPagedList } from '../models/CourseSessionListItemPagedList';
import type { TokenResult } from '../models/TokenResult';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CourseService {
    /**
     * @param requestBody
     * @returns Course Success
     * @throws ApiError
     */
    public static postCourseSave(
        requestBody?: Course,
    ): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/save',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CourseGroup Success
     * @throws ApiError
     */
    public static postCourseGroupSave(
        requestBody?: CourseGroup,
    ): CancelablePromise<CourseGroup> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/group/save',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param courseGroupId
     * @param userId
     * @returns any Success
     * @throws ApiError
     */
    public static postCourseGroupAttenderUserAdd(
        courseGroupId?: number,
        userId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/group/attender-user/add',
            query: {
                'courseGroupId': courseGroupId,
                'userId': userId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param courseGroupId
     * @param attenderGroupId
     * @returns any Success
     * @throws ApiError
     */
    public static postCourseGroupAttenderGroupAdd(
        courseGroupId?: number,
        attenderGroupId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/group/attender-group/add',
            query: {
                'courseGroupId': courseGroupId,
                'AttenderGroupId': attenderGroupId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param courseGroupId
     * @param teacherUserId
     * @returns any Success
     * @throws ApiError
     */
    public static postCourseGroupTeacherAssign(
        courseGroupId?: number,
        teacherUserId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/group/teacher/assign',
            query: {
                'courseGroupId': courseGroupId,
                'teacherUserId': teacherUserId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param sessionId
     * @returns CourseSessionListItem Success
     * @throws ApiError
     */
    public static getCourseTeacherSessionGet(
        sessionId?: number,
    ): CancelablePromise<CourseSessionListItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course/teacher/session/get',
            query: {
                'sessionId': sessionId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param courseGroupId
     * @returns CourseSessionListItem Success
     * @throws ApiError
     */
    public static getCourseStudentGroupSessionsGet(
        courseGroupId?: number,
    ): CancelablePromise<Array<CourseSessionListItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course/student/group/sessions/get',
            query: {
                'courseGroupId': courseGroupId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param courseGroupId
     * @returns AttendanceLog Success
     * @throws ApiError
     */
    public static getCourseStudentAttendanceGet(
        courseGroupId?: number,
    ): CancelablePromise<Array<AttendanceLog>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course/student/attendance/get',
            query: {
                'courseGroupId': courseGroupId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CourseSession Success
     * @throws ApiError
     */
    public static postCourseSessionSave(
        requestBody?: CourseSession,
    ): CancelablePromise<CourseSession> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/session/save',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CourseSessionListItemPagedList Success
     * @throws ApiError
     */
    public static postCourseStudentSessionsGet(
        requestBody?: CourseSessionListFiltersPagedListParams,
    ): CancelablePromise<CourseSessionListItemPagedList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/student/sessions/get',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns CourseSessionListItemPagedList Success
     * @throws ApiError
     */
    public static postCourseTeacherSessionsGet(
        requestBody?: CourseSessionListFiltersPagedListParams,
    ): CancelablePromise<CourseSessionListItemPagedList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/course/teacher/sessions/get',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param sessionId
     * @returns CourseSessionAttendanceRecord Success
     * @throws ApiError
     */
    public static getCourseSessionAttendanceListGet(
        sessionId?: number,
    ): CancelablePromise<Array<CourseSessionAttendanceRecord>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course/session/attendance-list/get',
            query: {
                'sessionId': sessionId,
            },
        });
    }
    /**
     * @param courseSessionId
     * @returns TokenResult Success
     * @throws ApiError
     */
    public static getCourseSessionAttendanceScannerTokenGet(
        courseSessionId?: number,
    ): CancelablePromise<TokenResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course/session/attendance/scanner/token/get',
            query: {
                'courseSessionId': courseSessionId,
            },
        });
    }
    /**
     * @param attenderToken
     * @returns User Success
     * @throws ApiError
     */
    public static getCourseSessionAttendanceRegister(
        attenderToken?: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course/session/attendance/register',
            query: {
                'attenderToken': attenderToken,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param attendingUserId
     * @param courseSessionId
     * @param addOrRemove
     * @returns AttendanceLog Success
     * @throws ApiError
     */
    public static getCourseSessionAttendanceToggle(
        attendingUserId?: number,
        courseSessionId?: number,
        addOrRemove?: boolean,
    ): CancelablePromise<Array<AttendanceLog>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/course/session/attendance/toggle',
            query: {
                'attendingUserId': attendingUserId,
                'courseSessionId': courseSessionId,
                'addOrRemove': addOrRemove,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }
}
