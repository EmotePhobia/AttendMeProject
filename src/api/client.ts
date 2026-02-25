import { OpenAPI } from "@/api/generated";

export function configureApi() {
  OpenAPI.BASE = "https://attendme-backend.runasp.net";

  OpenAPI.TOKEN = async (options: any) => {
    const url = String(options?.url ?? "");

    // 1) Ticket QR: musi iść na deviceToken (po rejestracji urządzenia)
    if (url === "/user/attendance/ticket/get") {
      return localStorage.getItem("deviceToken") ?? "";
    }

    // 2) Rejestracja urządzenia: musi iść na deviceRegisterToken (tymczasowy z linku)
    if (url === "/user/device/register") {
      return sessionStorage.getItem("deviceRegisterToken") ?? "";
    }

    // 3) Wszystko inne (login user / teacher / student api) idzie na authToken
    return sessionStorage.getItem("authToken") ?? "";
  };
}