<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { CourseService } from "@/api/generated";
import type { CourseSessionAttendanceRecord, CourseSessionListItem } from "@/api/generated";
import { formatDateTime } from "@/utils/date";

const route = useRoute();

const sessionIdRaw = computed(() => route.params.sessionId);
const sessionId = computed(() => Number(sessionIdRaw.value));
const isValidSessionId = computed(() => Number.isFinite(sessionId.value) && sessionId.value > 0);

const loading = ref(false);
const error = ref<string | null>(null);

const session = ref<CourseSessionListItem | null>(null);

const attendance = ref<CourseSessionAttendanceRecord[]>([]);
const attendanceLoading = ref(false);
const attendanceError = ref<string | null>(null);

async function loadSession() {
  if (!isValidSessionId.value) {
    error.value = `Nieprawidłowy sessionId w URL: ${String(sessionIdRaw.value)}`;
    return;
  }

  loading.value = true;
  error.value = null;
  try {
    session.value = await CourseService.getCourseTeacherSessionGet(sessionId.value);
  } catch (e: any) {
    console.log("Teacher session details error:", e);
    error.value = e?.body?.message ?? e?.message ?? "Nie udało się pobrać szczegółów zajęć.";
  } finally {
    loading.value = false;
  }
}

async function loadAttendance() {
  if (!isValidSessionId.value) {
    attendanceError.value = "Nieprawidłowy sessionId w URL.";
    return;
  }

  attendanceLoading.value = true;
  attendanceError.value = null;
  try {
    attendance.value = await CourseService.getCourseSessionAttendanceListGet(sessionId.value);
  } catch (e: any) {
    console.log("Attendance list error:", e);
    attendanceError.value = e?.body?.message ?? e?.message ?? "Nie udało się pobrać listy obecności.";
  } finally {
    attendanceLoading.value = false;
  }
}

async function refreshAll() {
  await loadSession();
  await loadAttendance();
}

let intervalId: number | undefined;

onMounted(async () => {
  if (!isValidSessionId.value) return;
  await refreshAll();

  intervalId = window.setInterval(() => {
    loadAttendance();
  }, 10_000);
});

onUnmounted(() => {
  if (intervalId) window.clearInterval(intervalId);
});

function scannerLink() {
  return `${location.origin}${location.pathname}#/teacher/sessions/${sessionId.value}/scanner`;
}

async function copyScannerLink() {
  await navigator.clipboard.writeText(scannerLink());
  alert("Skopiowano link do skanera.");
}
</script>

<template>
  <div class="space-y-4">
    <div class="bg-white rounded-2xl shadow p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold">Szczegóły zajęć</h2>
          <p class="text-slate-600 mt-1">ID: {{ isValidSessionId ? sessionId : "—" }}</p>
        </div>

        <div class="flex gap-2">
          <button class="px-4 py-2 rounded-xl border bg-slate-50 hover:bg-white" @click="copyScannerLink">
            Kopiuj link do skanera
          </button>

          <router-link
            class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            :to="`/teacher/sessions/${sessionId}/scanner`"
          >
            Otwórz skaner
          </router-link>
        </div>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
      <div v-if="loading" class="mt-4 text-sm text-slate-500">Ładowanie szczegółów...</div>

      <div v-if="session" class="mt-4 text-sm text-slate-700 space-y-1">
        <div><span class="font-medium">Przedmiot:</span> {{ (session as any).courseName ?? (session as any).name ?? "—" }}</div>
        <div><span class="font-medium">Grupa:</span> {{ (session as any).courseGroupName ?? (session as any).groupName ?? "—" }}</div>
        <div>
          <span class="font-medium">Termin:</span>
          {{ formatDateTime((session as any).dateStart ?? "") }}
        </div>
        <div><span class="font-medium">Lokalizacja:</span> {{ session?.locationName ?? "—" }}</div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <div class="p-4 border-b flex items-center justify-between">
        <div class="font-medium">Lista obecności</div>

        <button
          class="px-3 py-1.5 rounded-lg border bg-slate-50 hover:bg-white disabled:opacity-60"
          :disabled="attendanceLoading"
          @click="loadAttendance"
        >
          {{ attendanceLoading ? "Odświeżanie..." : "Odśwież" }}
        </button>
      </div>

      <p v-if="attendanceError" class="px-6 pt-4 text-sm text-red-600">{{ attendanceError }}</p>

      <div v-if="attendanceLoading && !attendance.length" class="p-6 text-slate-500 text-sm">
        Pobieranie listy obecności...
      </div>

      <div v-if="!attendanceLoading && !attendance.length" class="p-6 text-slate-600">
        Brak danych obecności.
      </div>

      <ul class="divide-y" v-if="attendance.length">
        <li v-for="a in attendance" :key="a.attendanceLogId ?? a.attenderUserId ?? a.courseSessionId" class="p-4">
          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="font-medium">
                {{ a.userName ?? "" }} {{ a.userSurname ?? "" }}
              </div>
              <div class="text-sm text-slate-600">
                Nr indeksu: {{ a.studentAlbumIdNumber ?? "—" }}
              </div>
            </div>

            <span
              class="text-sm px-2 py-1 rounded-lg"
              :class="a.wasUserPresent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ a.wasUserPresent ? "Obecny" : "Nieobecny" }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>