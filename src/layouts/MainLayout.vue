<template>
  <div>
    <Navbar />

    <v-main>
      <router-view v-slot="{ Component }">
        <v-slide-x-transition mode="out-in">
          <component :is="Component" :key="$route.path" />
        </v-slide-x-transition>
      </router-view>
    </v-main>

    <v-footer class="footer" padless>
      <v-container>
        <v-row class="footer-top" no-gutters>
          <v-col cols="12" md="4" class="brand-col">
            <div class="brand">
              <img src="" alt="E-Slip logo" class="brand-logo" />
              <div class="brand-text">
                <div class="brand-name">E-Slip</div>
                <div class="brand-tag">Digital slips, simply done</div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="links-col">
            <nav aria-label="Footer navigation">
              <v-row>
                <v-col cols="6">
                  <a class="footer-link" href="/about">About</a>
                </v-col>
                <v-col cols="6">
                  <a class="footer-link" href="/services">Services</a>
                </v-col>
                <v-col cols="6">
                  <a class="footer-link" href="/contact">Contact</a>
                </v-col>
                <v-col cols="6">
                  <a class="footer-link" href="/help">Help</a>
                </v-col>
              </v-row>
            </nav>
          </v-col>

          <v-col cols="12" md="4" class="social-col">
            <div class="social" role="contentinfo">
              <div class="social-label">Follow us</div>
              <div class="social-icons" aria-hidden="false">
                <a class="icon" href="https://github.com/jaipongz" aria-label="Github" target="_blank" rel="noopener">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .5C5.7.5.7 5.5.7 11.8c0 5 3.3 9.3 7.9 10.8.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7.8 2 .6.1-.5.4-1 .7-1.2-2.5-.3-5.1-1.3-5.1-5.8 0-1.3.5-2.4 1.2-3.3-.2-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.3a11.2 11.2 0 0 1 6 0C17.7 5 18.7 5.3 18.7 5.3c.6 1.6.3 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.5-2.6 5.5-5.1 5.8.4.4.7 1 .7 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.8C23.3 5.5 18.3.5 12 .5z"/>
                  </svg>
                </a>
                <a class="icon" href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7H8.2v-2.9h2.3V9.4c0-2.3 1.3-3.6 3.3-3.6.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.3v1.6h2.3l-.4 2.9h-1.9v7C18.3 21.1 22 17 22 12z"/>
                  </svg>
                </a>
                <a class="icon" href="mailto:hello@eslip.example" aria-label="Email" target="_blank" rel="noopener">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-divider class="footer-divider"></v-divider>

        <v-row class="footer-bottom" align="center" no-gutters>
          <v-col cols="12" md="6" class="copyright">
            <small>&copy; {{ new Date().getFullYear() }} E-Slip — Made with <span aria-hidden="true">❤️</span> in Thailand by <a href="https://github.com/jaipongz" target="_blank" rel="noopener">Bonsai Phawakhot</a></small>
          </v-col>
          <v-col cols="12" md="6" class="legal text-right">
            <a class="footer-legal" href="/terms">Terms</a>
            <span class="mx-2">•</span>
            <a class="footer-legal" href="/privacy">Privacy</a>
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
.footer {
  background-color: rgba(27, 60, 83, 0.8) !important;
  color: #ffffff !important;
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

/* Professional footer styles */
.footer {
  background: linear-gradient(180deg, rgba(21, 41, 57, 1), rgba(27, 60, 83, 0.95));
  color: #e6f0f6;
}

.footer .v-container {
  max-width: 1200px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
}

.brand-name {
  font-weight: 700;
  font-size: 1.1rem;
}
.brand-tag {
  font-size: 0.85rem;
  color: rgba(230,240,246,0.85);
}

.footer-top { padding: 24px 0; }
.links-col { display: flex; align-items: center; }
.links-col .footer-link {
  color: rgba(230,240,246,0.95);
  display: inline-block;
  padding: 6px 0;
  transition: color 0.15s ease, transform 0.15s ease;
}
.footer-link:hover, .footer-legal:hover { color: #fff; transform: translateY(-2px); }

.social { text-align: right; }
.social-label { font-size: 0.85rem; margin-bottom: 8px; color: rgba(230,240,246,0.9); }
.social-icons { display: flex; gap: 12px; justify-content: flex-end; }
.social .icon { color: rgba(230,240,246,0.95); display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.03); transition: background 0.15s ease, transform 0.12s ease; }
.social .icon:hover { background: rgba(255,255,255,0.06); transform: translateY(-3px); }
.social .icon svg { display: block; }

.footer-divider { background-color: rgba(255,255,255,0.04); }

.footer-bottom { padding: 14px 0; align-items: center; }
.copyright { color: rgba(230,240,246,0.8); }
.legal { display: flex; justify-content: flex-end; gap: 12px; align-items: center; }
.footer-legal { color: rgba(230,240,246,0.85); }

/* Responsive tweaks */
@media (max-width: 959px) {
  .social { text-align: left; margin-top: 12px; }
  .legal { justify-content: flex-start; margin-top: 8px; }
}

/* Accessibility helpers */
.footer a { color: inherit; text-decoration: none; }
.footer a:focus { outline: 3px solid rgba(255,255,255,0.12); outline-offset: 2px; border-radius: 4px; }
</style>

