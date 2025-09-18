import axiosInstance from './axios.service'
import { useAuthStore } from '@/stores/auth.store'
import Swal from 'sweetalert2'
import router from '@/router'

class AuthService {
  // ล็อกอินด้วย email/password
  async login(credentials) {
    try {
      const response = await axiosInstance.post('/auth/login', credentials)
      
      const { user, token, refreshToken } = response.data
      
      // เก็บข้อมูลใน store (memory)
      const authStore = useAuthStore()
      authStore.setAuth(user, token, refreshToken)
      
      // เริ่มต้น timer สำหรับ auto logout
      authStore.startTokenExpirationTimer()
      
      return { success: true, user }
    } catch (error) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ' 
      }
    }
  }

  // ล็อกอินด้วย Google
  async loginWithGoogle(googleToken) {
    try {
      const response = await axiosInstance.post('/auth/google', { 
        token: googleToken 
      })
      
      const { user, token, refreshToken } = response.data
      
      const authStore = useAuthStore()
      authStore.setAuth(user, token, refreshToken)
      authStore.startTokenExpirationTimer()
      
      return { success: true, user }
    } catch (error) {
      console.error('Google login failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'เข้าสู่ระบบด้วย Google ไม่สำเร็จ' 
      }
    }
  }

  // ล็อกอินด้วย Facebook
  async loginWithFacebook(facebookData) {
    try {
      const response = await axiosInstance.post('/auth/facebook', {
        id: facebookData.id,
        name: facebookData.name,
        email: facebookData.email,
        picture: facebookData.picture
      })
      
      const { user, token, refreshToken } = response.data
      
      const authStore = useAuthStore()
      authStore.setAuth(user, token, refreshToken)
      authStore.startTokenExpirationTimer()
      
      return { success: true, user }
    } catch (error) {
      console.error('Facebook login failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'เข้าสู่ระบบด้วย Facebook ไม่สำเร็จ' 
      }
    }
  }

    // ล็อกอินด้วย Facebook
    async loginWithFacebook(facebookToken) {
      try {
        const response = await axiosInstance.post('/auth/facebook', {
          token: facebookToken
        })

        const { user, token, refreshToken } = response.data

        const authStore = useAuthStore()
        authStore.setAuth(user, token, refreshToken)
        authStore.startTokenExpirationTimer()

        return { success: true, user }
      } catch (error) {
        console.error('Facebook login failed:', error)
        return {
          success: false,
          message: error.response?.data?.message || 'เข้าสู่ระบบด้วย Facebook ไม่สำเร็จ'
        }
      }
    }

  // สมัครสมาชิก
  async register(userData) {
    try {
      const response = await axiosInstance.post('/auth/register', userData)
      
      // ไม่ต้องล็อกอินทันทีหลังจาก register
      // เพราะต้องให้ user ยืนยันอีเมลก่อน
      
      // แสดง SweetAlert และไปหน้า login
      await Swal.fire({
        title: 'สมัครสมาชิกสำเร็จ!',
        text: 'กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันบัญชี',
        icon: 'success',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#1976D2'
      })
      
      // ไปหน้า login
      router.push('/login')
      
      return { success: true, user: response.data.user }
    } catch (error) {
      console.error('Registration failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ' 
      }
    }
  }

  // ออกจากระบบ
  async logout() {
    try {
      // เรียก API logout (optional)
      await axiosInstance.post('/auth/logout')
    } catch (error) {
      console.error('Logout API failed:', error)
      // ไม่ต้อง throw error เพราะเราจะลบข้อมูลต่อไป
    } finally {
      // ลบข้อมูลออกจาก store ไม่ว่าจะเรียก API สำเร็จหรือไม่
      const authStore = useAuthStore()
      authStore.clearAuth()
    }
  }

  // รีเฟรช token
  async refreshToken() {
    const authStore = useAuthStore()
    return await authStore.refreshAuthToken()
  }

  // ตรวจสอบสถานะการล็อกอิน
  async checkAuthStatus() {
    const authStore = useAuthStore()
    
    // โหลดข้อมูล user จาก localStorage (ถ้ามี)
    authStore.loadUserFromStorage()
    
    // ถ้าไม่มี token ใน memory แสดงว่าไม่ได้ล็อกอิน
    if (!authStore.token) {
      return { isAuthenticated: false }
    }
    
    // ตรวจสอบว่า token ยังใช้ได้หรือไม่
    const isValid = await authStore.validateToken()
    
    if (!isValid) {
      authStore.clearAuth()
      return { isAuthenticated: false }
    }
    
    return { 
      isAuthenticated: true, 
      user: authStore.user 
    }
  }

  // เปลี่ยนรหัสผ่าน
  async changePassword(currentPassword, newPassword) {
    try {
      await axiosInstance.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
      
      return { success: true }
    } catch (error) {
      console.error('Change password failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'เปลี่ยนรหัสผ่านไม่สำเร็จ' 
      }
    }
  }

  // ลืมรหัสผ่าน
  async forgotPassword(email) {
    try {
      await axiosInstance.post('/auth/forgot-password', { email })
      
      return { success: true }
    } catch (error) {
      console.error('Forgot password failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'ส่งอีเมลไม่สำเร็จ' 
      }
    }
  }

  // รีเซ็ตรหัสผ่าน
  async resetPassword(token, newPassword) {
    try {
      await axiosInstance.post('/auth/reset-password', {
        token,
        newPassword
      })
      
      return { success: true }
    } catch (error) {
      console.error('Reset password failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'รีเซ็ตรหัสผ่านไม่สำเร็จ' 
      }
    }
  }
}

// สร้าง instance เดียวสำหรับทั้งแอป
export const authService = new AuthService()
export default authService