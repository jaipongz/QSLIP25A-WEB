import emailVerifyService from '@/services/email-verify.service'
import Swal from 'sweetalert2'

export default {
  name: 'EmailVerify',
  data() {
    return {
      loading: true,
      verified: false,
      error: null,
      supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@e-slip.com',
      verificationMessage: ''
    };
  },
  methods: {
    async verifyToken(token) {
      try {
        this.loading = true
        this.error = null
        
        const result = await emailVerifyService.verifyEmail(token)
        
        if (result.success) {
          this.verified = true
          this.verificationMessage = result.message || 'อีเมลของคุณได้รับการยืนยันเรียบร้อยแล้ว'
          
          // แสดง success alert และไปหน้าแรก
          await Swal.fire({
            title: 'ยืนยันสำเร็จ!',
            text: 'อีเมลของคุณได้รับการยืนยันเรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonText: 'ไปหน้าแรก',
            confirmButtonColor: '#1976D2'
          })
          
          this.$router.push('/')
        } else {
          this.error = result.message || 'การยืนยันล้มเหลว กรุณาลองอีกครั้ง'
        }
      } catch (err) {
        console.error('Verification error:', err)
        this.error = 'เกิดข้อผิดพลาดในการยืนยัน กรุณาลองอีกครั้งในภายหลัง'
      } finally {
        this.loading = false
      }
    },
    
    tryAgain() {
      const token = this.$route.query.token
      if (token) {
        this.verifyToken(token)
      }
    },
    
    goToLogin() {
      this.$router.push('/login')
    },
    
    goToHome() {
      this.$router.push('/')
    },
    
    goToSupport() {
      window.location.href = `mailto:${this.supportEmail}?subject=ปัญหาการยืนยันอีเมล E-Slip&body=กรุณาระบุรายละเอียดปัญหาที่พบ`
    },
    
    async resendVerification() {
      try {
        const email = this.$route.query.email
        if (!email) {
          this.error = 'ไม่พบข้อมูลอีเมล กรุณาติดต่อฝ่ายสนับสนุน'
          return
        }
        
        const result = await emailVerifyService.resendVerificationEmail(email)
        
        if (result.success) {
          await Swal.fire({
            title: 'ส่งอีเมลแล้ว!',
            text: 'ส่งลิงก์ยืนยันใหม่ไปยังอีเมลของคุณแล้ว',
            icon: 'success',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#1976D2'
          })
        } else {
          this.error = result.message
        }
      } catch (error) {
        console.error('Resend verification error:', error)
        this.error = 'ไม่สามารถส่งลิงก์ยืนยันใหม่ได้ กรุณาลองอีกครั้ง'
      }
    }
  },
  
  mounted() {
    const token = this.$route.query.token;
    
    if (!token) {
      this.error = 'ลิงก์ยืนยันไม่ถูกต้อง กรุณาตรวจสอบอีเมลของคุณเพื่อหาลิงก์ที่ถูกต้อง'
      this.loading = false
      return
    }
    
    // ตรวจสอบว่า token มีรูปแบบที่ถูกต้องหรือไม่ (hex string)
    const tokenPattern = /^[a-fA-F0-9]+$/
    if (!tokenPattern.test(token)) {
      this.error = 'รูปแบบลิงก์ยืนยันไม่ถูกต้อง'
      this.loading = false
      return
    }
    
    this.verifyToken(token)
  }
};