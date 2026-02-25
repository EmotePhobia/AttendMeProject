<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { UserService } from "@/api/generated";

const ticket = ref<string>("");
const loading = ref(false);
const error = ref<string | null>(null);
const lastUpdated = ref<Date | null>(null);

let timerId: number | undefined;

async function fetchTicket() {
  loading.value = true;
  error.value = null;

  try {
    const res = await UserService.getUserAttendanceTicketGet();
    const t = (res.token ?? "").trim();
    if (!t) throw new Error("Backend nie zwrócił tokenu ticket.");
    ticket.value = t;
    lastUpdated.value = new Date();
  } catch (e: any) {
    console.log("TICKET ERROR:", e);
    ticket.value = "";
    error.value =
      e?.body?.title ??
      e?.body?.message ??
      e?.message ??
      "Nie udało się pobrać ticketu. Sprawdź czy urządzenie jest zarejestrowane (deviceToken).";
  } finally {
    loading.value = false;
  }
}

function clearDeviceToken() {
  localStorage.removeItem("deviceToken");
  ticket.value = "";
  error.value = "Usunięto deviceToken. Zarejestruj urządzenie ponownie.";
}

onMounted(async () => {
  await fetchTicket();
  timerId = window.setInterval(fetchTicket, 2000);
});

onUnmounted(() => {
  if (timerId) window.clearInterval(timerId);
});
</script>

<template>
  <div class="bg-white rounded-2xl shadow p-6 space-y-4">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold">Rejestrowanie obecności (QR)</h2>
        <p class="text-slate-600 mt-1">
          Kod odświeża się co 2 sekundy. Pokaż go prowadzącemu do zeskanowania.
        </p>
      </div>

      <router-link class="px-4 py-2 rounded-xl border bg-slate-50 hover:bg-white" to="/student/device-register">
        Rejestracja urządzenia
      </router-link>
    </div>

    <div v-if="error" class="text-sm text-red-600">
      {{ error }}
      <div class="mt-2">
        <button class="px-3 py-1.5 rounded-lg border bg-slate-50 hover:bg-white" @click="clearDeviceToken">
          Wyczyść deviceToken
        </button>
      </div>
    </div>

    <div v-if="loading && !ticket" class="text-sm text-slate-500">
      Pobieranie ticketu...
    </div>

    <div v-if="ticket" class="space-y-3">
      <div class="flex justify-center">
        <QrcodeVue :value="ticket" :size="240" />
      </div>

      <div class="text-xs break-all text-slate-600 text-center">
        {{ ticket }}
      </div>

      <div class="text-xs text-slate-500 text-center" v-if="lastUpdated">
        Ostatnia aktualizacja: {{ lastUpdated.toLocaleTimeString() }}
      </div>
    </div>
  </div>
</template>