import { decodeCredential } from "vue3-google-login";

export default {
  name: "loginSocial",
  // ประกาศ event ที่ component นี้จะส่งออกไป
  emits: ["login-success", "login-error"],
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
          provider: 'google'
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
      // ตรวจสอบว่า Facebook SDK โหลดแล้วหรือยัง
      if (typeof FB === 'undefined') {
        console.error('Facebook SDK ยังไม่ได้โหลด');
        this.$emit('login-error', {
          provider: 'facebook',
          message: 'Facebook SDK ยังไม่พร้อมใช้งาน กรุณาลองอีกครั้งในสักครู่'
        });
        return;
      }

      // เช็ค login status ก่อน
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          // ผู้ใช้ล็อกอินแล้ว ดึงข้อมูลมาเลย
          this.getFacebookUserInfo();
        } else {
          // ยังไม่ได้ล็อกอิน เรียก FB.login
          FB.login(
            (loginResponse) => {
              if (loginResponse.authResponse) {
                console.log('Facebook Login Success:', loginResponse);
                this.getFacebookUserInfo();
              } else {
                console.error('ผู้ใช้ยกเลิกการล็อกอินหรือไม่อนุญาต');
                this.$emit('login-error', {
                  provider: 'facebook',
                  message: 'การเข้าสู่ระบบถูกยกเลิก'
                });
              }
            },
            { 
              scope: 'public_profile,email',
              return_scopes: true 
            }
          );
        }
      });
    },

    getFacebookUserInfo() {
      FB.api('/me', { fields: 'id,name,email,picture.type(large)' }, (userInfo) => {
        if (userInfo && !userInfo.error) {
          console.log('Facebook User Info:', userInfo);
          
          const userData = {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture?.data?.url,
            provider: 'facebook'
          };

          // ตรวจสอบข้อมูลที่จำเป็น
          if (!userData.email) {
            console.warn('ไม่สามารถดึงอีเมลจาก Facebook ได้');
            this.$emit('login-error', {
              provider: 'facebook',
              message: 'ไม่สามารถดึงข้อมูลอีเมลได้ กรุณาตรวจสอบการอนุญาตของแอป'
            });
            return;
          }

          // ส่ง event สำเร็จกลับไป
          this.$emit("login-success", userData);
        } else {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', userInfo.error);
          this.$emit('login-error', {
            provider: 'facebook',
            message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้'
          });
        }
      });
    },
  },
};
