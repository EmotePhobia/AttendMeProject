import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import LoginView from "@/views/LoginView.vue";
import AppLayout from "@/layouts/AppLayout.vue";

import TeacherDashboard from "@/views/teacher/TeacherDashboard.vue";
import TeacherSessionDetails from "@/views/teacher/TeacherSessionDetails.vue";
import TeacherScannerView from "@/views/teacher/TeacherScannerView.vue";

import StudentDashboard from "@/views/student/StudentDashboard.vue";
import StudentSessionDetails from "@/views/student/StudentSessionDetails.vue";
import DeviceRegisterView from "@/views/student/DeviceRegisterView.vue";
import AttendanceQrView from "@/views/student/AttendanceQrView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },

  { path: "/login", component: LoginView, meta: { title: "Logowanie" } },

  {
    path: "/teacher",
    component: AppLayout,
    children: [
      { path: "", component: TeacherDashboard, meta: { title: "Pulpit wykładowcy" } },
      { path: "sessions/:sessionId", component: TeacherSessionDetails, meta: { title: "Szczegóły zajęć" } },
      { path: "sessions/:sessionId/scanner", component: TeacherScannerView, meta: { title: "Skaner (placeholder)" } },
    ],
  },

  {
    path: "/student",
    component: AppLayout,
    children: [
      { path: "", component: StudentDashboard, meta: { title: "Pulpit studenta" } },
      { path: "device-register", component: DeviceRegisterView, meta: { title: "Rejestracja urządzenia" } },
      { path: "sessions/:courseGroupId", component: StudentSessionDetails, meta: { title: "Szczegóły zajęć" } },
      { path: "attendance", component: AttendanceQrView, meta: { title: "Rejestruj obecność" } },
    ],
  },

  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = `AttendMe — ${(to.meta.title as string) ?? "App"}`;
});
import { useAuthStore } from "@/stores/auth.store";

router.beforeEach(async (to) => {
  const auth = useAuthStore();


  if (auth.token && !auth.user) {
    await auth.restoreUser();
  }

  const isPublic = to.path === "/login";
  if (!isPublic && !auth.isLoggedIn) return "/login";


  if (isPublic && auth.isLoggedIn) {
    if (auth.isTeacher) return "/teacher";
    if (auth.isStudent) return "/student";
  }
});
export default router;