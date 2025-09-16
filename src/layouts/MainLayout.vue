<template>
  <div>
    <Navbar />

    <v-main class="mt-16">
      <router-view />
    </v-main>

    <v-footer
      color="primary"
      dark
      padless
    >
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col class="text-center" cols="12">
            <div class="footer-content">
              {{ new Date().getFullYear() }} — <strong>E-Slip</strong>
              <span class="mx-2">|</span>
              Made with ❤️ in Thailand
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'MainLayout',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.footer-content {
  padding: 16px 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Global styles for the layout */
:deep(.v-main) {
  padding-top: 0 !important;
}
</style>