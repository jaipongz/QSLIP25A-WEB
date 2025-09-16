<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.footer-content {
  padding: 16px 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Global styles for the app */
:deep(.v-main) {
  padding-top: 0 !important;
}

/* Custom scrollbar */
:deep(*::-webkit-scrollbar) {
  width: 8px;
}

:deep(*::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 4px;
}

:deep(*::-webkit-scrollbar-thumb) {
  background: #c1c1c1;
  border-radius: 4px;
}

:deep(*::-webkit-scrollbar-thumb:hover) {
  background: #a8a8a8;
}
</style>
