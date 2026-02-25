<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { CourseService } from "@/api/generated";
import type { CourseSessionListItemPagedList, CourseSessionListFiltersPagedListParams, CourseSessionListItem } from "@/api/generated";
import { formatDateTime } from "@/utils/date";

function logAndGo(s: any) {
  console.log("SESSION ITEM CLICKED:", s);
}
const loading = ref(false);
const error = ref<string | null>(null);
const data = ref<CourseSessionListItemPagedList | null>(null);

const items = computed<CourseSessionListItem[]>(() => data.value?.items ?? []);

type TimeFilter = "today" | "tomorrow" | "nextWeek" | "past" | "all";
const timeFilter = ref<TimeFilter>("today");
const textFilter = ref("");

function calcDateRange(filter: TimeFilter): { from?: string; to?: string } {
  const now = new Date();

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);

  if (filter === "all") return {};

  if (filter === "today") {
    const from = startOfDay(now);
    const to = endOfDay(now);
    return { from: from.toISOString(), to: to.toISOString() };
  }

  if (filter === "tomorrow") {
    const t = new Date(now);
    t.setDate(t.getDate() + 1);
    return { from: startOfDay(t).toISOString(), to: endOfDay(t).toISOString() };
  }

  if (filter === "nextWeek") {
    const from = startOfDay(now);
    const to = new Date(from);
    to.setDate(to.getDate() + 7);
    return { from: from.toISOString(), to: endOfDay(to).toISOString() };
  }

  const to = endOfDay(now);
  return { to: to.toISOString() };
}

function buildBody(): CourseSessionListFiltersPagedListParams {
  const range = calcDateRange(timeFilter.value);

  const filters: CourseSessionListFilters = {};

  // zakres czasu
  if (range.from) filters.dateStart = range.from;
  if (range.to) filters.dateEnd = range.to;

  // tekst (przedmiot/grupa/sala…)
  const q = textFilter.value.trim();
  if (q) filters.search = q; // najprościej

  return {
    pageNumber: 1,
    pageSize: 999999,
    filters: Object.keys(filters).length ? filters : undefined,
    sortBy: null,
  };
}

async function load() {
  loading.value = true;
  error.value = null;
  try {
    const body = buildBody();
    data.value = await CourseService.postCourseTeacherSessionsGet(body);
  } catch (e: any) {
    console.log("Teacher sessions error:", e);
    error.value = e?.body?.message ?? e?.message ?? "Nie udało się pobrać listy zajęć.";
  } finally {
    loading.value = false;
  }
}

onMounted(load);

let t: number | undefined;
watch([timeFilter, textFilter], () => {
  window.clearTimeout(t);
  t = window.setTimeout(() => load(), 300);
});
</script>

<template>
  <div class="space-y-4">
    <div class="bg-white rounded-2xl shadow p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold">Pulpit wykładowcy</h2>
          <p class="text-slate-600 mt-1">Lista prowadzonych zajęć</p>
        </div>

        <button
          class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
          :disabled="loading"
          @click="load"
        >
          {{ loading ? "Ładowanie..." : "Odśwież" }}
        </button>
      </div>

      <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <select v-model="timeFilter" class="border rounded-xl px-3 py-2">
          <option value="today">Dziś</option>
          <option value="tomorrow">Jutro</option>
          <option value="nextWeek">Następny tydzień</option>
          <option value="past">Minione</option>
          <option value="all">Wszystkie</option>
        </select>

        <input
          v-model="textFilter"
          class="border rounded-xl px-3 py-2 md:col-span-2"
          placeholder="Szukaj (przedmiot, grupa, sala...)"
        />
      </div>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
      <p v-if="loading && !items.length" class="mt-4 text-sm text-slate-500">Pobieranie danych...</p>
    </div>

    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <div class="p-4 border-b font-medium">Zajęcia</div>

      <div v-if="!loading && !items.length" class="p-6 text-slate-600">
        Brak zajęć do wyświetlenia.
      </div>

      <ul class="divide-y">
<li v-for="s in items" :key="(s as any).courseSessionId"
          class="p-4 hover:bg-slate-50"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="font-semibold">
                {{ (s as any).courseName ?? (s as any).name ?? "Zajęcia" }}
              </div>

              <div class="text-sm text-slate-600 mt-1">
                Grupa: {{ (s as any).courseGroupName ?? (s as any).groupName ?? "-" }}
                • Termin:
                {{ formatDateTime((s as any).dateStart) }}
              </div>

              <div class="text-sm text-slate-600">
               Lokalizacja: {{ (s as any).locationName ?? "—" }}
              </div>
            </div>
<router-link
  class="shrink-0 px-3 py-1.5 rounded-lg border bg-slate-50 hover:bg-white"
  :to="`/teacher/sessions/${(s as any).courseSessionId}`"
>
  Szczegóły
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>