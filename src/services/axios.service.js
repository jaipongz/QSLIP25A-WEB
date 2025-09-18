import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER+'/api'  || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
  withCredentials: false, 
})

// Request interceptor - เพิ่ม token จาก store
axiosInstance.interceptors.request.use(config => {
  const authStore = useAuthStore()
  
  // ดึง token จาก store
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  
  return config
}, error => {
  return Promise.reject(error)
})

// Response interceptor - จัดการกับ token หมดอายุ
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const authStore = useAuthStore()
    
    if (error.response?.status === 401) {
      // Token หมดอายุหรือไม่ถูกต้อง
      console.log('Token expired or invalid')
      
      // ลองรีเฟรช token
      const refreshed = await authStore.refreshAuthToken()
      
      if (refreshed && error.config) {
        // ลองส่ง request ใหม่ด้วย token ใหม่
        error.config.headers.Authorization = `Bearer ${authStore.token}`
        return axiosInstance(error.config)
      } else {
        // รีเฟรชไม่ได้ ต้อง logout
        authStore.clearAuth()
        // TODO: redirect to login page
        // window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance
