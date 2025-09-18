import { useAuthStore } from '@/stores/auth.store'
import { authService } from '@/services/auth.service'

export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      appTitle: 'E-Slip',
      logoUrl: '/favicon.ico',
      navigationItems: [
        {
          title: 'หน้าแรก',
          icon: 'mdi-home',
          route: '/'
        },
        {
          title: 'เกี่ยวกับ',
          icon: 'mdi-information',
          route: '/about'
        },
        {
          title: 'บริการ',
          icon: 'mdi-cogs',
          route: '/services'
        },
        {
          title: 'ติดต่อ',
          icon: 'mdi-phone',
          route: '/contact'
        }
      ]
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    userInitials() {
      if (!this.user?.name) return ''
      return this.user.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
  },
  methods: {
    closeDrawer() {
      this.drawer = false
    },
    async handleLogout() {
      try {
        await authService.logout()
        this.$router.push('/')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goToProfile() {
      this.$router.push('/profile')
    }
  },
  async mounted() {
    // ตรวจสอบสถานะ auth เมื่อโหลดหน้าเว็บ
    await authService.checkAuthStatus()
  }
}