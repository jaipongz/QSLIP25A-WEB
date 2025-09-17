export default {
  name: "login",
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
    };
  },
  methods: {
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
    },
  },
};
