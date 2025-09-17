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

    loginWithFacebook() {
      if (typeof FB === "undefined") {
        alert(
          "Facebook SDK could not be loaded. Please check your connection or ad-blocker."
        );
        return;
      }

      // เรียกใช้ Popup Login ของ Facebook
      FB.login(
        (response) => {
          if (response.authResponse) {
            console.log("Facebook Login Success:", response);

            // เมื่อ Login สำเร็จ ให้ดึงข้อมูลโปรไฟล์
            FB.api(
              "/me",
              { fields: "name, email, picture" },
              (profileResponse) => {
                console.log("Facebook Profile:", profileResponse);

                this.userData = {
                  name: profileResponse.name,
                  email: profileResponse.email,
                  picture: profileResponse.picture.data.url,
                };

                // ณ จุดนี้ คุณควรส่ง response.authResponse.accessToken ไปให้ Backend
              }
            );
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "public_profile,email" }
      ); // ขอ permission เพื่อเข้าถึง email
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
