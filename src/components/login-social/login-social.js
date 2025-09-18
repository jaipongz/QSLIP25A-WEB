import { decodeCredential } from "vue3-google-login";

export default {
  name: "loginSocial",
  // ประกาศ event ที่ component นี้จะส่งออกไป
  emits: ["login-success"],
  data() {
    return {
      useGoogleComponent: true, // สลับเป็น false หากปุ่ม Google ทับ
    };
  },
  methods: {
    handleGoogleLogin(response) {
      // Handle both Google Component callback และ custom button click
      if (response && response.credential) {
        // From Google Component
        const decodedToken = decodeCredential(response.credential);
        console.log("Google Login Success in Child:", decodedToken);

        const userData = {
          name: decodedToken.name,
          email: decodedToken.email,
          picture: decodedToken.picture,
        };

        // *** ส่ง event 'login-success' กลับไปหาแม่ พร้อมกับข้อมูล userData ***
        this.$emit("login-success", userData);
      } else {
        // From custom button - implement Google OAuth flow here
        console.log("Custom Google button clicked - implement OAuth flow");
        // You would integrate with Google OAuth here
      }
    },

    loginWithFacebook() {
      // Implement Facebook Login flow here
      FB.login(
        (response) => {
          if (response.authResponse) {
            FB.api("/me", { fields: "name,email,picture" }, (userInfo) => {
              console.log("Facebook Login Success in Child:", userInfo);
              const userData = {
                name: userInfo.name,
                email: userInfo.email,
                picture: userInfo.picture?.data?.url,
              };
              // *** ส่ง event 'login-success' กลับไปหาแม่ พร้อมกับข้อมูล userData ***
              this.$emit("login-success", userData);
            });
          } else {
            console.error("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "public_profile,email" }
      );
    },
  },
};
