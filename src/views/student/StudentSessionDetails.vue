<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { CourseService } from "@/api/generated";
import type { AttendanceLog, CourseSessionListItem } from "@/api/generated";
import { formatDateTime } from "@/utils/date";

const route = useRoute();
const courseGroupId = computed(() => Number(route.params.courseGroupId));

const loading = ref(false);
const error = ref<string | null>(null);

const sessions = ref<CourseSessionListItem[]>([]);
const attendance = ref<AttendanceLog[]>([]);

const header = computed(() => {
  const first = sessions.value[0];
  return {
    courseName: first?.courseName ?? "—",
    groupName: first?.courseGroupName ?? "—",
  };
});

// Z AttendanceLog wynika: jeśli jest wpis dla courseSessionId => obecny
const presentSessionIds = computed(() => {
  const set = new Set<number>();
  for (const a of attendance.value) {
    if (typeof a.courseSessionId === "number") set.add(a.courseSessionId);
  }
  return set;
});

// (opcjonalnie) data rejestracji obecności dla danej sesji
const presentInfoBySessionId = computed(() => {
  const m = new Map<number, string>();
  for (const a of attendance.value) {
    if (typeof a.courseSessionId === "number" && a.dateCreated) {
      m.set(a.courseSessionId, a.dateCreated);
    }
  }
  return m;
});

const presentCount = computed(() => {
  let c = 0;
  for (const s of sessions.value) {
    const sid = s.courseSessionId;
    if (typeof sid === "number" && presentSessionIds.value.has(sid)) c++;
  }
  return c;
});

const totalCount = computed(() => sessions.value.length);

const attendancePercent = computed(() => {
  if (!totalCount.value) return 0;
  return Math.round((presentCount.value / totalCount.value) * 100);
});

async function loadAll() {
  loading.value = true;
  error.value = null;

  try {
    const id = courseGroupId.value;
    if (!Number.isFinite(id) || id <= 0) throw new Error("Nieprawidłowy courseGroupId w URL.");

    const [sess, att] = await Promise.all([
      CourseService.getCourseStudentGroupSessionsGet(id),
      CourseService.getCourseStudentAttendanceGet(id),
    ]);

    sessions.value = sess ?? [];
    attendance.value = att ?? [];
  } catch (e: any) {
    console.log("Student details error:", e);
    error.value = e?.body?.message ?? e?.message ?? "Nie udało się pobrać danych.";
  } finally {
    loading.value = false;
  }
}

//autorefresh
let timer: number | undefined;
onMounted(async () => {
  await loadAll();
  timer = window.setInterval(loadAll, 15000);
});
onUnmounted(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<template>
  <div class="space-y-4">
    <div class="bg-white rounded-2xl shadow p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold">Szczegóły zajęć</h2>
          <p class="text-slate-600 mt-1">
            {{ header.courseName }} • {{ header.groupName }}
          </p>
        </div>

        <div class="flex gap-2">
          <router-link
            class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            to="/student/attendance"
          >
            Rejestruj obecność
          </router-link>

          <button class="px-4 py-2 rounded-xl border bg-slate-50 hover:bg-white" @click="loadAll">
            Odśwież
          </button>
        </div>
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
      <p v-if="loading && !sessions.length" class="mt-4 text-sm text-slate-500">Pobieranie danych...</p>

      <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="rounded-2xl border bg-slate-50 p-4">
          <div class="text-sm text-slate-600">Frekwencja</div>
          <div class="text-2xl font-semibold mt-1">{{ presentCount }} / {{ totalCount }}</div>
        </div>

        <div class="rounded-2xl border bg-slate-50 p-4">
          <div class="text-sm text-slate-600">Procent</div>
          <div class="text-2xl font-semibold mt-1">{{ attendancePercent }}%</div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <div class="p-4 border-b font-medium">Zajęcia w tej grupie</div>

      <div v-if="!loading && !sessions.length" class="p-6 text-slate-600">
        Brak danych do wyświetlenia.
      </div>

      <ul class="divide-y">
        <li v-for="s in sessions" :key="s.courseSessionId" class="p-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="font-semibold">
                {{ s.courseName ?? "—" }}
              </div>
              <div class="text-sm text-slate-600 mt-1">
                Termin: {{ formatDateTime(s.dateStart ?? "") }}
              </div>
              <div class="text-sm text-slate-600">
                Lokalizacja: {{ s.locationName ?? "—" }}
              </div>

              <div v-if="typeof s.courseSessionId === 'number'" class="text-xs text-slate-500 mt-1">
                <span v-if="presentInfoBySessionId.get(s.courseSessionId)">
                  Zarejestrowano: {{ formatDateTime(presentInfoBySessionId.get(s.courseSessionId)!) }}
                </span>
              </div>
            </div>

            <div class="text-sm">
              <span
                v-if="typeof s.courseSessionId === 'number' && presentSessionIds.has(s.courseSessionId)"
                class="px-2 py-1 rounded-lg bg-green-100 text-green-800"
              >
                Obecny
              </span>
              <span
                v-else
                class="px-2 py-1 rounded-lg bg-red-100 text-red-800"
              >
                Nieobecny
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>