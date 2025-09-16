export default {
  name: 'Homepage',
  data() {
    return {
      heroTitle: 'ยินดีต้อนรับสู่ E-Slip',
      heroSubtitle: 'แพลตฟอร์มที่ทำให้การจัดการเอกสารของคุณง่ายขึ้น รวดเร็ว และมีประสิทธิภาพ',
      features: [
        {
          id: 1,
          title: 'จัดการได้ง่าย',
          description: 'อินเตอร์เฟซที่เข้าใจง่าย ใช้งานได้ทันทีโดยไม่ต้องเรียนรู้ซับซ้อน',
          icon: 'mdi-gesture-tap',
          color: 'primary'
        },
        {
          id: 2,
          title: 'ความปลอดภัยสูง',
          description: 'ระบบรักษาความปลอดภัยขั้นสูง ปกป้องข้อมูลของคุณอย่างแน่นหนา',
          icon: 'mdi-shield-check',
          color: 'success'
        },
        {
          id: 3,
          title: 'รองรับมือถือ',
          description: 'ใช้งานได้ทุกที่ทุกเวลา บนอุปกรณ์ทุกประเภทที่คุณต้องการ',
          icon: 'mdi-cellphone',
          color: 'info'
        },
        {
          id: 4,
          title: 'ประมวลผลเร็ว',
          description: 'เทคโนโลยีล่าสุดที่ทำให้ระบบทำงานได้รวดเร็วและเสถียร',
          icon: 'mdi-rocket',
          color: 'warning'
        },
        {
          id: 5,
          title: 'รายงานแบบเรียลไทม์',
          description: 'ดูข้อมูลและสถิติต่างๆ ได้แบบเรียลไทม์ ทำให้ตัดสินใจได้อย่างรวดเร็ว',
          icon: 'mdi-chart-line',
          color: 'error'
        },
        {
          id: 6,
          title: 'ซัพพอร์ต 24/7',
          description: 'ทีมงานผู้เชี่ยวชาญพร้อมให้ความช่วยเหลือคุณตลอด 24 ชั่วโมง',
          icon: 'mdi-headset',
          color: 'purple'
        }
      ],
      statistics: [
        {
          id: 1,
          number: '10,000+',
          label: 'ผู้ใช้งาน'
        },
        {
          id: 2,
          number: '50,000+',
          label: 'เอกสารที่ประมวลผล'
        },
        {
          id: 3,
          number: '99.9%',
          label: 'อัพไทม์'
        },
        {
          id: 4,
          number: '24/7',
          label: 'การสนับสนุน'
        }
      ]
    }
  },
  mounted() {
    this.initAnimations()
  },
  methods: {
    scrollToFeatures() {
      const featuresSection = document.getElementById('features')
      if (featuresSection) {
        featuresSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        })
      }
    },
    learnMore() {
      // Navigate to about page or show more info
      this.$router.push('/about')
    },
    showFeatureDetail(feature) {
      // Show feature detail modal or navigate
      console.log('Feature clicked:', feature.title)
      // You can implement a modal or navigation here
    },
    getStarted() {
      // Navigate to registration or getting started page
      this.$router.push('/services')
      console.log('Get started clicked')
      // You can implement registration flow here
    },
    initAnimations() {
      // Initialize any scroll animations if needed
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in')
            }
          })
        },
        { threshold: 0.1 }
      )

      // Observe feature cards
      const featureCards = document.querySelectorAll('.feature-card')
      featureCards.forEach((card) => observer.observe(card))

      // Observe stat items
      const statItems = document.querySelectorAll('.stat-item')
      statItems.forEach((item) => observer.observe(item))
    }
  }
}