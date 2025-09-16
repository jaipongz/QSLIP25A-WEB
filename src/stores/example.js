import { defineStore } from 'pinia'

// ใช้ defineStore เพื่อสร้าง store
export const useCounterStore = defineStore('counter', {
  // state คือข้อมูลหลัก คล้าย data() ใน component
  state: () => ({
    count: 0,
    name: 'Eduardo'
  }),

  // getters คือ computed property สำหรับ store
  getters: {
    doubleCount: (state) => state.count * 2,
  },

  // actions คือ method สำหรับแก้ไข state
  actions: {
    increment() {
      this.count++ // สามารถแก้ไข state ได้โดยตรง ไม่ต้องผ่าน mutation
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})