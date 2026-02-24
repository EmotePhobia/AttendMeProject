<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const auth = useAuthStore();

const loginName = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

async function onSubmit() {
  error.value = null;
  loading.value = true;

  try {
    await auth.login(loginName.value.trim(), password.value);

    if (auth.isTeacher) await router.push("/teacher");
    else if (auth.isStudent) await router.push("/student");
    else error.value = "Konto nie ma roli Teacher ani Student.";
  } catch (e: any) {
    console.log("LOGIN ERROR:", e);
    error.value = e?.body?.message ?? e?.message ?? "Nie udało się zalogować.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthLayout>
    <div class="bg-white rounded-2xl shadow p-6">
      <h1 class="text-xl font-semibold">AttendMe</h1>
      <p class="text-slate-600 mt-1">Zaloguj się</p>

      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>

      <form class="mt-6 space-y-3" @submit.prevent="onSubmit">
        <input
          v-model="loginName"
          class="w-full border rounded-xl px-3 py-2"
          placeholder="Login"
          autocomplete="username"
        />
        <input
          v-model="password"
          class="w-full border rounded-xl px-3 py-2"
          type="password"
          placeholder="Hasło"
          autocomplete="current-password"
        />

        <button
          class="w-full rounded-xl bg-slate-900 text-white py-2 hover:bg-slate-800 disabled:opacity-60"
          :disabled="loading"
          type="submit"
        >
          {{ loading ? "Logowanie..." : "Zaloguj" }}
        </button>
      </form>

      <div class="mt-4 text-xs text-slate-500">
        Teacher: pk / 123#Asd
      </div>
    </div>
  </AuthLayout>
</template>