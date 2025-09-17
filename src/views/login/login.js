import ForgotPasswordDialog from "@/components/ForgotPasswordDialog.vue";
import LoginSocial from "@/components/LoginSocial.vue";

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
    onSocialLoginSuccess(dataFromChild) {
      console.log('Data received from child component:', dataFromChild);
      this.userData = dataFromChild;
      
      // ส่งข้อมูลไป Backend หรือ redirect ไปหน้าอื่นได้
      // this.$router.push('/dashboard');
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
