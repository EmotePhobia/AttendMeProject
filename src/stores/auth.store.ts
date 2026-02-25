import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { UserService } from "@/api/generated";
import type { User } from "@/api/generated/models/User";
import type { TokenResult } from "@/api/generated/models/TokenResult";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(sessionStorage.getItem("authToken"));
  const user = ref<User | null>(null);

const isLoggedIn = computed(() => !!token.value);
const isTeacher = computed(() => !!user.value?.isTeacher);
const isStudent = computed(() => !!user.value?.isStudent);

  function setToken(t: string | null) {
    token.value = t;
    if (t) sessionStorage.setItem("authToken", t);
    else sessionStorage.removeItem("authToken");
  }

  async function login(loginName: string, password: string) {
    // 1) login -> token
    const result: TokenResult = await UserService.postUserLogin(loginName, password);

    const t = (result as any).token as string | undefined;
    if (!t) throw new Error("Brak tokenu w odpowiedzi z backendu.");

    setToken(t);

    //  pobiera usera
    user.value = await UserService.getUserGet(undefined);
  }

  async function restoreUser() {
    if (!token.value) return;
    try {
      user.value = await UserService.getUserGet(undefined);
    } catch {
      setToken(null);
      user.value = null;
    }
  }

function logout() {

  sessionStorage.removeItem("authToken");


  user.value = null;


  sessionStorage.removeItem("scannerToken");
  sessionStorage.removeItem("deviceRegisterToken");

  // localStorage.removeItem("deviceToken");
}

  return { token, user, isLoggedIn, isTeacher, isStudent, login, restoreUser, logout };
});