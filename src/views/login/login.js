import ForgotPasswordDialog from "@/components/ForgotPasswordDialog.vue";
import { decodeCredential } from "vue3-google-login";

export default {
  name: "login",
  components: {
    ForgotPasswordDialog, // ลงทะเบียน component
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showPassword: false,
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
    };
  },
  methods: {
    handleGoogleLogin(response) {
      // response.credential คือ JWT token ที่มีข้อมูลผู้ใช้
      const decodedToken = decodeCredential(response.credential);

      console.log("Google Login Success:", decodedToken);

      // นำข้อมูลโปรไฟล์มาเก็บไว้ใน state
      this.userData = {
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture,
      };

      // ณ จุดนี้ คุณควรส่ง response.credential ไปให้ Backend ของคุณ
    },
    logout() {
      this.userData = null;
    },
    submitLogin() {
      console.log("Login Submitted:", this.form);
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
