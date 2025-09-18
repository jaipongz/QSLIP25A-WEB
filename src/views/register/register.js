import { decodeCredential } from "vue3-google-login";
import LoginSocial from "@/components/LoginSocial.vue";
import authService from '@/services/auth.service'
import Swal from 'sweetalert2'

export default {
  name: "register",
  components: {
    LoginSocial,
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
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
      userData: null,
    };
  },
  methods: {
    onSocialLoginSuccess(dataFromChild) {
      console.log("Data received from child component:", dataFromChild);
      this.userData = dataFromChild;

      // ส่งข้อมูลไป Backend หรือ redirect ไปหน้าอื่นได้
      // this.$router.push('/dashboard');
    },

    logout() {
      this.userData = null;
    },

    async submitCreate() {
      console.log("Form Submitted:", this.form);
      
      this.loading = true;
      this.error = null;

      try {
        // แปลงข้อมูลให้ตรงกับ API
        const userData = {
          name: `${this.form.firstName} ${this.form.lastName}`.trim(),
          email: this.form.email,
          password: this.form.password
        };

        const result = await authService.register(userData);

        if (!result.success) {
          this.error = result.message;
          await Swal.fire({
            title: 'ไม่สามารถสมัครสมาชิกได้',
            text: result.message,
            icon: 'error',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#1976D2'
          });
        }
        // หาก success แล้ว authService จะจัดการ redirect และ alert เอง
      } catch (error) {
        console.error('Register error:', error);
        this.error = 'เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองอีกครั้ง';
        await Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองอีกครั้ง',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#1976D2'
        });
      } finally {
        this.loading = false;
      }
    },
    goToLogin() {
      this.$router.push("/login");
      console.log("Go to login page");
    },
    goToHome() {
      this.$router.push("/");
      console.log("Go to home page");
    },
  },
};
