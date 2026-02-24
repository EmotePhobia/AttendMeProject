import { OpenAPI } from "@/api/generated";

export function configureApi() {
  OpenAPI.BASE = "https://attendme-backend.runasp.net";

  OpenAPI.TOKEN = async (options: any) => {
    const url: string = options?.url ?? "";

    if (url.startsWith("/user/attendance/ticket/get")) {
      return localStorage.getItem("deviceToken") ?? sessionStorage.getItem("authToken") ?? "";
    }

    if (url.startsWith("/user/device/register")) {
      return sessionStorage.getItem("deviceRegisterToken") ?? "";
    }

    if (url.includes("/course/session/attendance/register")) {
      return sessionStorage.getItem("authToken") ?? "";
    }

    return sessionStorage.getItem("authToken") ?? "";
  };
}