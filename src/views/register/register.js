import { decodeCredential } from "vue3-google-login";
import LoginSocial from "@/components/LoginSocial.vue";

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

    submitCreate() {
      console.log("Form Submitted:", this.form);
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
