import { decodeCredential } from "vue3-google-login";

export default {
  name: "loginSocial",
 // ประกาศ event ที่ component นี้จะส่งออกไป
  emits: ['login-success'], 
  methods: {
    handleGoogleLogin(response) {
      const decodedToken = decodeCredential(response.credential);
      console.log('Google Login Success in Child:', decodedToken);
      
      const userData = {
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture
      };
      
      // *** ส่ง event 'login-success' กลับไปหาแม่ พร้อมกับข้อมูล userData ***
      this.$emit('login-success', userData);
    },
    
    loginWithFacebook() {
      if (typeof FB === 'undefined') { return; }
      
      FB.login((response) => {
        if (response.authResponse) {
          FB.api('/me', { fields: 'name, email, picture' }, (profileResponse) => {
            console.log('Facebook Profile in Child:', profileResponse);

            const userData = {
              name: profileResponse.name,
              email: profileResponse.email,
              picture: profileResponse.picture.data.url
            };
            
            // *** ส่ง event 'login-success' กลับไปหาแม่ พร้อมกับข้อมูล userData ***
            this.$emit('login-success', userData);
          });
        }
      }, { scope: 'public_profile,email' });
    }
  }
};
