import { decodeCredential } from "vue3-google-login";
import LoginSocial from "@/components/LoginSocial.vue";
import authService from "@/services/auth.service";
import Swal from "sweetalert2";

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
      dialogUserData: false,
    };
  },
  computed: {
    isUserDataValid() {
      return this.userData && this.userData.name && this.userData.email;
    },
  },
  methods: {
    async onSocialLoginSuccess(dataFromChild) {
      console.log("Data received from child component:", dataFromChild);

      // ตรวจสอบว่าข้อมูลมีครบถ้วนหรือไม่
      if (dataFromChild && dataFromChild.name && dataFromChild.email) {
        this.userData = dataFromChild;
        this.dialogUserData = true; // เปิด dialog แสดงข้อมูลผู้ใช้
        try {
          let result;

          // เรียก auth service ตาม provider
          if (dataFromChild.provider === "facebook") {
            result = await authService.loginWithFacebook(dataFromChild);
          } else {
            // Google login หรือ provider อื่นๆ
            result = await authService.loginWithGoogle(dataFromChild);
          }

          if (result.success) {
            // แสดง success alert
            await Swal.fire({
              title: "เข้าสู่ระบบสำเร็จ!",
              text: `ยินดีต้อนรับ ${result.user.name || result.user.email}`,
              icon: "success",
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#1976D2",
              timer: 2000,
            });

            // ไปหน้าแรก
            this.$router.push("/");
          } else {
            // Backend login failed
            await Swal.fire({
              title: "ไม่สามารถเข้าสู่ระบบได้",
              text: result.message,
              icon: "error",
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#1976D2",
            });
          }
        } catch (error) {
          console.error("Auth service error:", error);
          await Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองอีกครั้ง",
            icon: "error",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#1976D2",
          });
        }
      } else {
        console.error("Invalid user data received:", dataFromChild);
        await Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถรับข้อมูลผู้ใช้จาก Social Login ได้",
          icon: "error",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#1976D2",
        });
      }
    },

    async onSocialLoginError(errorData) {
      console.error("Social Login Error:", errorData);

      await Swal.fire({
        title: `เกิดข้อผิดพลาดกับ ${
          errorData.provider === "facebook" ? "Facebook" : "Social"
        } Login`,
        text: errorData.message || "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#1976D2",
      });
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
          password: this.form.password,
        };

        const result = await authService.register(userData);

        if (!result.success) {
          this.error = result.message;
          await Swal.fire({
            title: "ไม่สามารถสมัครสมาชิกได้",
            text: result.message,
            icon: "error",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#1976D2",
          });
        }
        // หาก success แล้ว authService จะจัดการ redirect และ alert เอง
      } catch (error) {
        console.error("Register error:", error);
        this.error = "เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองอีกครั้ง";
        await Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองอีกครั้ง",
          icon: "error",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#1976D2",
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
