export default {
  name: "register",
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
    };
  },
  methods: {
    submitCreate() {
      console.log("Form Submitted:", this.form);
      // Add your form submission logic here
    },
    goToLogin() {
      // this.$router.push('/login')
      console.log("Go to login page");
    },
    goToHome() {
      this.$router.push('/')
      console.log("Go to home page");
    },
  },
};
