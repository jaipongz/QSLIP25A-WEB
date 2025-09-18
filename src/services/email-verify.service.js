import axiosInstance from './axios.service'
import { useAuthStore } from '@/stores/auth.store'

class EmailVerifyService {
  // ยืนยันอีเมลด้วย token
  async verifyEmail(token) {
    try {
      const response = await axiosInstance.post('/auth/verify-email', { token })
      
      const { user, authToken, refreshToken } = response.data
      
      // ล็อกอินผู้ใช้หลังจากยืนยันอีเมลแล้ว
      const authStore = useAuthStore()
      authStore.setAuth(user, authToken, refreshToken)
      authStore.startTokenExpirationTimer()
      
      return { 
        success: true, 
        user,
        message: 'ยืนยันอีเมลสำเร็จ' 
      }
    } catch (error) {
      console.error('Email verification failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'การยืนยันอีเมลไม่สำเร็จ' 
      }
    }
  }

  // ส่งอีเมลยืนยันใหม่
  async resendVerificationEmail(email) {
    try {
      await axiosInstance.post('/auth/resend-verification', { email })
      
      return { 
        success: true,
        message: 'ส่งอีเมลยืนยันใหม่แล้ว' 
      }
    } catch (error) {
      console.error('Resend verification failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'ส่งอีเมลไม่สำเร็จ' 
      }
    }
  }
}

// สร้าง instance เดียวสำหรับทั้งแอป
export const emailVerifyService = new EmailVerifyService()
export default emailVerifyService