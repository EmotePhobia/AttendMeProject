<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { CourseService } from "@/api/generated";
import { OpenAPI } from "@/api/generated";

const route = useRoute();
const sessionId = computed(() => Number(route.params.sessionId));

const scannerToken = ref<string | null>(sessionStorage.getItem("scannerToken"));
const attenderToken = ref("");
const info = ref<string | null>(null);
const loadingToken = ref(false);
const loadingRegister = ref(false);

async function getScannerToken() {
  info.value = null;
  loadingToken.value = true;
  try {
    const res = await (CourseService as any).getCourseSessionAttendanceScannerTokenGet(sessionId.value);
    const t = (res as any).token ?? (res as any).value ?? (res as any).accessToken;
    if (!t) throw new Error("Brak tokenu w odpowiedzi.");
    scannerToken.value = t;
    sessionStorage.setItem("scannerToken", t);
    info.value = "Pobrano token skanera (zapisany w sessionStorage).";
  } catch (e: any) {
    console.log(e);
    info.value = e?.body?.message ?? e?.message ?? "Nie udało się pobrać tokenu skanera.";
  } finally {
    loadingToken.value = false;
  }
}

async function registerAttendance() {
  info.value = null;
  loadingRegister.value = true;

 try {
  if (!attenderToken.value.trim()) throw new Error("Wklej token studenta (z QR).");
  if (!scannerToken.value) throw new Error("Brak scannerToken — kliknij 'Pobierz token skanera'.");

  const prev = OpenAPI.TOKEN;
  OpenAPI.TOKEN = async () => scannerToken.value;

  const res = await CourseService.getCourseSessionAttendanceRegister(attenderToken.value.trim());

  OpenAPI.TOKEN = prev;

  info.value = "Obecność zarejestrowana.";
} catch (e:any) {
    console.log("REGISTER ERROR:", e);
    info.value = e?.body?.message ?? e?.message ?? "Nie udało się zarejestrować obecności.";
  } finally {
    loadingRegister.value = false;
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow p-6 space-y-4">
    <div>
      <h2 class="text-lg font-semibold">Skaner obecności (placeholder)</h2>
      <p class="text-slate-600 mt-1">SessionId: {{ sessionId }}</p>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button class="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
              :disabled="loadingToken" @click="getScannerToken">
        {{ loadingToken ? "Pobieranie..." : "Pobierz token skanera" }}
      </button>

      <button class="px-4 py-2 rounded-xl border bg-slate-50 hover:bg-white"
              @click="sessionStorage.removeItem('scannerToken'); scannerToken=null;">
        Wyczyść scanner token
      </button>
    </div>

    <div class="text-sm">
      <div class="font-medium">scannerToken:</div>
      <div class="break-all text-slate-700">{{ scannerToken ?? "—" }}</div>
    </div>

    <div class="border-t pt-4 space-y-2">
      <div class="font-medium">Rejestruj obecność (ręczne wklejenie)</div>
      <input v-model="attenderToken" class="w-full border rounded-xl px-3 py-2" placeholder="Wklej token z QR studenta" />
      <button class="w-full px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
              :disabled="loadingRegister" @click="registerAttendance">
        {{ loadingRegister ? "Wysyłanie..." : "Zarejestruj" }}
      </button>
    </div>

    <p v-if="info" class="text-sm text-slate-700">{{ info }}</p>
  </div>
</template>