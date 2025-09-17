export default {
  name: "ForgotPasswordDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      step: 1,
      loading: false,
      email: '',
      otp: '',
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    };
  },
  watch: {
    // Reset state ทุกครั้งที่ Dialog เปิดขึ้นมาใหม่
    modelValue(isOpen) {
      if (isOpen) {
        this.resetState();
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:modelValue', false)
    },
    resetState() {
      this.step = 1;
      this.email = '';
      this.otp = '';
      this.error = null;
      this.loading = false;
    },
    // จำลองการตรวจสอบอีเมลกับ Backend
    verifyEmail() {
      this.loading = true;
      this.error = null;

      // จำลองการเรียก API (ใช้ setTimeout)
      setTimeout(() => {
        // --- Logic จริง ---
        // ให้คุณเรียก API ตรวจสอบอีเมลที่นี่
        // ------------------
        
        // จำลอง: ถ้าอีเมลคือ 'test@example.com' ถือว่าถูกต้อง
        if (this.email === 'test@example.com') {
          console.log('Email verified. Sending OTP...');
          this.step = 2; // ไปยังหน้ากรอก OTP
        } else {
          this.error = 'This email address is not registered.';
        }
        
        this.loading = false;
      }, 1500); // หน่วงเวลา 1.5 วินาที
    },
    // จำลองการยืนยัน OTP
    submitOtp() {
      this.loading = true;
      this.error = null;

      setTimeout(() => {
        // --- Logic จริง ---
        // ให้คุณเรียก API ตรวจสอบ OTP ที่นี่
        // ------------------

        // จำลอง: ถ้า OTP คือ '123456' ถือว่าถูกต้อง
        if (this.otp === '123456') {
          console.log('OTP correct! You can now reset the password.');
          alert('OTP Verified! Redirecting to reset password page...');
          this.closeDialog();
          // ที่จุดนี้คุณอาจจะ redirect ไปหน้าตั้งรหัสผ่านใหม่
          // this.$router.push('/reset-password?token=xxx')
        } else {
          this.error = 'Invalid verification code. Please try again.';
        }

        this.loading = false;
      }, 1500);
    }
  },
};
