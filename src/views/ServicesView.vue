<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 text-center mb-6">บริการของเรา</h1>
        <p class="text-body-1 text-center mb-8">
          เรามีบริการหลากหลายที่จะช่วยให้การทำงานของคุณมีประสิทธิภาพมากขึ้น
        </p>
        
        <v-card class="pa-6">
          <v-card-title>บริการที่เรานำเสนอ</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title>การจัดการเอกสารอิเล็กทรอนิกส์</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title>ระบบลายเซ็นดิจิตอล</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title>การรายงานแบบเรียลไทม์</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ServicesView'
}
</script>

<style scoped>
.v-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>