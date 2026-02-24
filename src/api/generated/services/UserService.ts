/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceRegisterDTO } from '../models/DeviceRegisterDTO';
import type { StudentUserDTO } from '../models/StudentUserDTO';
import type { TeacherUserDTO } from '../models/TeacherUserDTO';
import type { TokenResult } from '../models/TokenResult';
import type { User } from '../models/User';
import type { UserDTO } from '../models/UserDTO';
import type { UserListFiltersPagedListParams } from '../models/UserListFiltersPagedListParams';
import type { UserListItemPagedList } from '../models/UserListItemPagedList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    static userLogin(arg0: { loginName: string; password: string; }): any {
        throw new Error("Method not implemented.");
    }
    static userGet(arg0: { userId: undefined; }): any {
        throw new Error("Method not implemented.");
    }
    /**
     * @param loginName
     * @param password
     * @returns TokenResult Success
     * @throws ApiError
     */
    public static postUserLogin(
        loginName?: string,
        password?: string,
    ): CancelablePromise<TokenResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            query: {
                'loginName': loginName,
                'password': password,
            },
        });
    }
    /**
     * @param deviceUserId
     * @returns any Success
     * @throws ApiError
     */
    public static postUserDeviceReset(
        deviceUserId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/device/reset',
            query: {
                'deviceUserId': deviceUserId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param deviceUserId
     * @returns TokenResult Success
     * @throws ApiError
     */
    public static getUserDeviceRegisterTokenGet(
        deviceUserId?: number,
    ): CancelablePromise<TokenResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/device/register/token/get',
            query: {
                'deviceUserId': deviceUserId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns TokenResult Success
     * @throws ApiError
     */
    public static postUserDeviceRegister(
        requestBody?: DeviceRegisterDTO,
    ): CancelablePromise<TokenResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/device/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns TokenResult Success
     * @throws ApiError
     */
    public static getUserAttendanceTicketGet(): CancelablePromise<TokenResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/attendance/ticket/get',
        });
    }
    /**
     * @param userId
     * @returns User Success
     * @throws ApiError
     */
    public static getUserGet(
        userId?: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get',
            query: {
                'userId': userId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns UserListItemPagedList Success
     * @throws ApiError
     */
    public static postUserListGet(
        requestBody?: UserListFiltersPagedListParams,
    ): CancelablePromise<UserListItemPagedList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/list/get',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param loginName
     * @param password
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static postUserStudentCreate(
        loginName?: string,
        password?: string,
        requestBody?: StudentUserDTO,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/student/create',
            query: {
                'loginName': loginName,
                'password': password,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param loginName
     * @param password
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static postUserTeacherCreate(
        loginName?: string,
        password?: string,
        requestBody?: TeacherUserDTO,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/teacher/create',
            query: {
                'loginName': loginName,
                'password': password,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param loginName
     * @param password
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static postUserAdminCreate(
        loginName?: string,
        password?: string,
        requestBody?: UserDTO,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/admin/create',
            query: {
                'loginName': loginName,
                'password': password,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * @param userId
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static putUserUpdate(
        userId?: number,
        requestBody?: UserDTO,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/update',
            query: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @param userId
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static putUserStudentUpdate(
        userId?: number,
        requestBody?: StudentUserDTO,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/student/update',
            query: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @param userId
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static putUserTeacherUpdate(
        userId?: number,
        requestBody?: TeacherUserDTO,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user/teacher/update',
            query: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
