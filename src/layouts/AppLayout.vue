<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const title = computed(() => (route.meta.title as string) ?? "AttendMe");

function logout() {
  router.push("/login");
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b">
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="font-semibold">{{ title }}</div>
        <button
          class="text-sm px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          @click="logout"
        >
          Wyloguj
        </button>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>