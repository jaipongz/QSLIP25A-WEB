import { defineStore } from 'pinia'

// ใช้ defineStore เพื่อสร้าง store
export const useAuthStore = defineStore('auth', {
  // state คือข้อมูลหลัก คล้าย data() ใน component
  state: () => ({
    user: null,
    token: null, // เก็บใน memory เท่านั้น
    refreshToken: null,
    isLoading: false,
    loginTime: null
  }),

  // getters คือ computed property สำหรับ store
  getters: {
    isAuthenticated: (state) => !!state.token,
    isTokenExpired: (state) => {
      if (!state.loginTime) return true
      // ตั้งให้ token หมดอายุใน 1 ชั่วโมง (3600 วินาที)
      const tokenExpireTime = state.loginTime + (60 * 60 * 1000)
      return Date.now() > tokenExpireTime
    },
    getUserInfo: (state) => state.user,
  },

  // actions คือ method สำหรับแก้ไข state
  actions: {
    // ตั้งค่าข้อมูล user และ token
    setAuth(user, token, refreshToken = null) {
      this.user = user
      this.token = token
      this.refreshToken = refreshToken
      this.loginTime = Date.now()
      
      // เก็บเฉพาะข้อมูล user ที่ไม่ sensitive ใน localStorage
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar
        }))
      }
    },

    // ล้างข้อมูล auth ทั้งหมด
    clearAuth() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.loginTime = null
      
      // ลบข้อมูลจาก localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('authToken')
    },

    // โหลดข้อมูล user จาก localStorage (เฉพาะข้อมูลที่ไม่ sensitive)
    loadUserFromStorage() {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
      }
    },

    // ตรวจสอบและรีเฟรช token
    async refreshAuthToken() {
      if (!this.refreshToken) {
        this.clearAuth()
        return false
      }

      try {
        this.isLoading = true
        // TODO: เรียก API เพื่อรีเฟรช token
        // const response = await authAPI.refreshToken(this.refreshToken)
        // this.setAuth(this.user, response.token, response.refreshToken)
        return true
      } catch (error) {
        console.error('Failed to refresh token:', error)
        this.clearAuth()
        return false
      } finally {
        this.isLoading = false
      }
    },

    // ตรวจสอบว่า token ยังใช้ได้อยู่หรือไม่
    async validateToken() {
      if (!this.token) return false
      
      if (this.isTokenExpired) {
        // ลองรีเฟรช token
        return await this.refreshAuthToken()
      }
      
      return true
    },

    // ฟังก์ชันสำหรับ auto logout เมื่อ token หมดอายุ
    startTokenExpirationTimer() {
      if (!this.loginTime) return
      
      const expireTime = this.loginTime + (60 * 60 * 1000) // 1 ชั่วโมง
      const timeUntilExpire = expireTime - Date.now()
      
      if (timeUntilExpire > 0) {
        setTimeout(() => {
          console.log('Token expired, logging out...')
          this.clearAuth()
          // TODO: redirect to login page
          // router.push('/login')
        }, timeUntilExpire)
      }
    }
  },
})