<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 text-center mb-6">เกี่ยวกับเรา</h1>
        <p class="text-body-1 text-center mb-8">
          เราคือทีมที่มุ่งมั่นในการสร้างโซลูชันที่ช่วยให้การทำงานของคุณง่ายขึ้น
        </p>
        
        <v-card class="pa-6 mb-6">
          <v-card-title class="text-h5 mb-4">วิสัยทัศน์ของเรา</v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              เราต้องการเป็นแพลตฟอร์มชั้นนำที่ช่วยให้องค์กรต่างๆ สามารถจัดการเอกสาร
              และกระบวนการทำงานได้อย่างมีประสิทธิภาพ ด้วยเทคโนโลยีที่ทันสมัยและง่ายต่อการใช้งาน
            </p>
            <p class="text-body-1">
              ด้วยประสบการณ์กว่า 10 ปีในการพัฒนาระบบสำหรับธุรกิจ เราเข้าใจความต้องการ
              และความท้าทายที่องค์กรต่างๆ เผชิญอยู่
            </p>
          </v-card-text>
        </v-card>

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" height="100%">
              <v-icon size="64" color="primary" class="mb-4">mdi-target</v-icon>
              <v-card-title class="text-h6">เป้าหมาย</v-card-title>
              <v-card-text>
                สร้างโซลูชันที่ตอบโจทย์การทำงานในยุคดิจิตอล
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" height="100%">
              <v-icon size="64" color="success" class="mb-4">mdi-heart</v-icon>
              <v-card-title class="text-h6">ค่านิยม</v-card-title>
              <v-card-text>
                ความซื่อสัตย์ นวัตกรรม และความใส่ใจในทุกรายละเอียด
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" height="100%">
              <v-icon size="64" color="warning" class="mb-4">mdi-lightbulb</v-icon>
              <v-card-title class="text-h6">นวัตกรรม</v-card-title>
              <v-card-text>
                พัฒนาเทคโนโลยีใหม่ๆ เพื่อให้ทุกคนเข้าถึงได้ง่าย
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.v-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>