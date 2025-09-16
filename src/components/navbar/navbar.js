export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      appTitle: 'E-Slip',
      logoUrl: '/favicon.ico',
      navigationItems: [
        {
          title: 'Home',
          icon: 'mdi-home',
          route: '/home'
        },
        {
          title: 'About',
          icon: 'mdi-information',
          route: '/about'
        },
        {
          title: 'Services',
          icon: 'mdi-cogs',
          route: '/services'
        },
        {
          title: 'Contact',
          icon: 'mdi-phone',
          route: '/contact'
        }
      ]
    }
  },
  methods: {
    closeDrawer() {
      this.drawer = false
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.display.smAndDown
    }
  }
}