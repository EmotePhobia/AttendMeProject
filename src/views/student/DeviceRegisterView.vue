<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserService } from "@/api/generated";
import type { DeviceRegisterDTO } from "@/api/generated";

const route = useRoute();
const router = useRouter();

const tokenFromLink = ref<string>(""); // <- TO MUSI BYĆ, inaczej masz błąd

const deviceName = ref("Mój telefon");
const studentName = ref("");
const studentSurname = ref("");
const albumIdNumber = ref<number | null>(null);

const loading = ref(false);
const message = ref<string | null>(null);

onMounted(() => {
  // 1) Wariant z demo: /#/device/register/:token
  const tokenParam = String(route.params.token ?? "").trim();

  // 2) Wariant query: /#/student/device-register?token=...
  const tokenQuery = String(route.query.token ?? "").trim();

  const t = tokenParam || tokenQuery;

  if (t) {
    tokenFromLink.value = t;
    sessionStorage.setItem("deviceRegisterToken", t); // token tymczasowy do Authorization
  }
});

async function registerDevice() {
  message.value = null;
  loading.value = true;

  try {
    const t = tokenFromLink.value.trim();
    if (!t) throw new Error("Brak tokenu rejestracji w URL. Otwórz link od wykładowcy.");

    sessionStorage.setItem("deviceRegisterToken", t);

    const body: DeviceRegisterDTO = {
      deviceName: deviceName.value,
      studentName: studentName.value.trim() || undefined,
      studentSurname: studentSurname.value.trim() || undefined,
      albumIdNumber: albumIdNumber.value ?? undefined,
    };

    const res = await UserService.postUserDeviceRegister(body);

    const deviceToken = (res.token ?? "").trim();
    if (!deviceToken) throw new Error("Backend nie zwrócił deviceToken.");

    localStorage.setItem("deviceToken", deviceToken);

    message.value = "Urządzenie zarejestrowane ✅";
    router.push("/student/attendance");
  } catch (e: any) {
    console.log("DEVICE REGISTER ERROR:", e);
    message.value = e?.body?.title ?? e?.body?.message ?? e?.message ?? "Rejestracja nie powiodła się.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow p-6 space-y-4">
    <h2 class="text-lg font-semibold">Rejestracja urządzenia</h2>

    <div class="space-y-2">
      <label class="text-sm font-medium">Token rejestracji (z linku)</label>
      <input v-model="tokenFromLink" class="w-full border rounded-xl px-3 py-2" />
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium">Nazwa urządzenia</label>
      <input v-model="deviceName" class="w-full border rounded-xl px-3 py-2" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="space-y-2">
        <label class="text-sm font-medium">Imię</label>
        <input v-model="studentName" class="w-full border rounded-xl px-3 py-2" />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Nazwisko</label>
        <input v-model="studentSurname" class="w-full border rounded-xl px-3 py-2" />
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Nr indeksu</label>
        <input v-model.number="albumIdNumber" type="number" class="w-full border rounded-xl px-3 py-2" />
      </div>
    </div>

    <button
      class="w-full px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
      :disabled="loading"
      @click="registerDevice"
    >
      {{ loading ? "Rejestrowanie..." : "Zarejestruj urządzenie" }}
    </button>

    <p v-if="message" class="text-sm" :class="message.includes('✅') ? 'text-green-700' : 'text-red-700'">
      {{ message }}
    </p>
  </div>
</template>