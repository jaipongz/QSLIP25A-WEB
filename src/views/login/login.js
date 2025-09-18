import ForgotPasswordDialog from "@/components/ForgotPasswordDialog.vue";
import LoginSocial from "@/components/LoginSocial.vue";
import authService from '@/services/auth.service'
import Swal from 'sweetalert2'

export default {
  name: "login",
  components: {
    ForgotPasswordDialog, // ลงทะเบียน component
    LoginSocial
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showPassword: false,
      loading: false,
      error: null,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      forgotDialog: false,
      userData: null,
      dialogUserData: false
    };
  },
  computed: {
    isUserDataValid() {
      return this.userData && 
             this.userData.name && 
             this.userData.email;
    }
  },
  methods: {
    async onSocialLoginSuccess(dataFromChild) {
      console.log('Data received from child component:', dataFromChild);
      
      // ตรวจสอบว่าข้อมูลมีครบถ้วนหรือไม่
      if (dataFromChild && dataFromChild.name && dataFromChild.email) {
        this.userData = dataFromChild;
        this.dialogUserData = true;
        
        // ส่งข้อมูลไป Backend หรือ redirect ไปหน้าอื่นได้
        // this.$router.push('/dashboard');
      } else {
        console.error('Invalid user data received:', dataFromChild);
        await Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถรับข้อมูลผู้ใช้จาก Social Login ได้',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#1976D2'
        });
      }
    },

    logout() {
      this.dialogUserData = false;
      this.userData = null;
    },
    
    async submitLogin() {
      console.log("Login Submitted:", this.form);
      
      this.loading = true;
      this.error = null;

      try {
        const result = await authService.login({
          email: this.form.email,
          password: this.form.password
        });

        if (result.success) {
          // แสดง success alert
          await Swal.fire({
            title: 'เข้าสู่ระบบสำเร็จ!',
            text: `ยินดีต้อนรับ ${result.user.name || result.user.email}`,
            icon: 'success',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#1976D2',
            timer: 2000
          });

          // ไปหน้าแรก
          this.$router.push('/');
        } else {
          this.error = result.message;
          await Swal.fire({
            title: 'ไม่สามารถเข้าสู่ระบบได้',
            text: result.message,
            icon: 'error',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#1976D2'
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        this.error = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองอีกครั้ง';
        await Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองอีกครั้ง',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#1976D2'
        });
      } finally {
        this.loading = false;
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
    goToHome() {
      this.$router.push("/");
    },
    forgotPassword() {
      console.log("Forgot password clicked");
      // this.$router.push('/forgot-password')
      this.forgotDialog = true;
    },
  },
};
