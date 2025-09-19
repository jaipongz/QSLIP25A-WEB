<template>
  <div>
    <Navbar />

    <v-main class="mt-16">
      <router-view v-slot="{ Component }">
        <v-slide-x-transition mode="out-in">
          <component :is="Component" :key="$route.path" />
        </v-slide-x-transition>
      </router-view>
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
              Made with ❤️ in Thailand By <a href="https://github.com/dashboard" >Bonsai Phawakhot</a>
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

<style>
* {
  font-family: 'Poppins', 'Prompt', sans-serif;
}
:root {
  --v-transition-duration: 0.5s; 
}
.loader {
  display: block;
  width: 84px;
  height: 84px;
  position: relative;
}

.loader:before , .loader:after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #FFF;
  transform: translate(-50% , -100%)  scale(0);
  animation: push_401 2s infinite linear;
}

.loader:after {
  animation-delay: 1s;
}

@keyframes push_401 {
  0% , 50% {
    transform: translate(-50% , 0%)  scale(1)
  }

  100% {
    transform: translate(-50%, -100%) scale(0)
  }
}
</style>

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

