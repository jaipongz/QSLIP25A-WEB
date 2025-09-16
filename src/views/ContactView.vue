<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 text-center mb-6">ติดต่อเรา</h1>
        <p class="text-body-1 text-center mb-8">
          เรายินดีที่จะรับฟังความคิดเห็นและให้ความช่วยเหลือคุณ
        </p>
        
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-4 mb-4">
              <v-card-title>ข้อมูลการติดต่อ</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-phone</v-icon>
                    </template>
                    <v-list-item-title>02-123-4567</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-email</v-icon>
                    </template>
                    <v-list-item-title>contact@e-slip.com</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-map-marker</v-icon>
                    </template>
                    <v-list-item-title>123 ถ.สุขุมวิท กรุงเทพฯ 10110</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="pa-4">
              <v-card-title>ส่งข้อความถึงเรา</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="ชื่อ"
                    variant="outlined"
                    class="mb-3"
                  ></v-text-field>
                  <v-text-field
                    label="อีเมล"
                    type="email"
                    variant="outlined"
                    class="mb-3"
                  ></v-text-field>
                  <v-textarea
                    label="ข้อความ"
                    variant="outlined"
                    rows="4"
                    class="mb-3"
                  ></v-textarea>
                  <v-btn color="primary" size="large" block>
                    ส่งข้อความ
                  </v-btn>
                </v-form>
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
  name: 'ContactView'
}
</script>

<style scoped>
.v-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>