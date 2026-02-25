import { OpenAPI } from "@/api/generated";

export function configureApi() {
  OpenAPI.BASE = "https://attendme-backend.runasp.net";

  OpenAPI.TOKEN = async (options: any) => {
    const url = String(options?.url ?? "");

    //  Ticket QR
    if (url === "/user/attendance/ticket/get") {
      return localStorage.getItem("deviceToken") ?? "";
    }

    // Rejestracja urządzenia
    if (url === "/user/device/register") {
      return sessionStorage.getItem("deviceRegisterToken") ?? "";
    }

    // Wszystko inne (login user / teacher / student api) 
    return sessionStorage.getItem("authToken") ?? "";
  };
}