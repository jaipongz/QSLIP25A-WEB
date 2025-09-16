# E-Slip - Vue 3 + Vuetify 3 Project

โปรเจค E-Slip พัฒนาด้วย Vue 3, Vuetify 3, และ Vite พร้อมโครงสร้างแฟ้มที่แยกส่วน HTML, CSS, และ JavaScript เพื่อความง่ายในการอ่านและบำรุงรักษาโค้ด

## โครงสร้างโปรเจค

```
src/
├── layouts/             # Layout components
│   └── MainLayout.vue   # หน้าหลัก (Navbar + Footer + RouterView)
├── components/          # คอมโพเนนต์ต่างๆ
│   ├── Navbar.vue       # คอมโพเนนต์แถบนำทาง
│   └── navbar/          # แฟ้มแยกส่วนของ Navbar
│       ├── navbar.html  # โครงสร้าง HTML
│       ├── navbar.css   # สไตล์ CSS
│       └── navbar.js    # ลอจิก JavaScript
├── views/               # หน้าต่างๆ ของเว็บ
│   ├── HomePage.vue     # หน้าแรก
│   ├── AboutView.vue    # หน้าเกี่ยวกับ
│   ├── ServicesView.vue # หน้าบริการ
│   ├── ContactView.vue  # หน้าติดต่อ
│   └── homepage/        # แฟ้มแยกส่วนของหน้าแรก
│       ├── homepage.html # โครงสร้าง HTML
│       ├── homepage.css  # สไตล์ CSS
│       └── homepage.js   # ลอจิก JavaScript
├── router/              # การกำหนดเส้นทาง (Nested Routes)
├── assets/              # ไฟล์ assets
└── main.js              # จุดเริ่มต้นแอปพลิเคชัน
```

## คุณสมบัติ

- ✅ Vue 3 + Composition API
- ✅ Vuetify 3 Material Design Components
- ✅ Vue Router สำหรับการนำทาง (Nested Routes)
- ✅ Material Design Icons
- ✅ Responsive Design
- ✅ การแยกแฟ้ม HTML, CSS, JS
- ✅ แถบนำทางที่รองรับมือถือ
- ✅ หน้าแรกที่สวยงาม
- ✅ Layout System (Navbar เป็น Parent Component)

## การติดตั้ง

### IDE ที่แนะนำ

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (ปิดการใช้ Vetur)

### ติดตั้ง Dependencies

```sh
npm install
```

### รันเซิร์ฟเวอร์พัฒนา

```sh
npm run dev
```

### สร้างไฟล์สำหรับ Production

```sh
npm run build
```

## วิธีการใช้งานโครงสร้างแฟ้มแยกส่วน

### สร้างคอมโพเนนต์ใหม่

1. สร้างโฟลเดอร์ใหม่ใน `src/components/` เช่น `mycomponent/`
2. สร้างไฟล์:
   - `mycomponent.html` - โครงสร้าง template
   - `mycomponent.css` - สไตล์
   - `mycomponent.js` - ลอจิก JavaScript
3. สร้างไฟล์ `MyComponent.vue` และใช้:

```vue
<template src="./mycomponent/mycomponent.html"></template>
<script src="./mycomponent/mycomponent.js"></script>
<style scoped src="./mycomponent/mycomponent.css"></style>
```

### ข้อดีของการแยกไฟล์

- 📖 **อ่านง่าย**: แยก concerns ชัดเจน
- 🔧 **บำรุงรักษาง่าย**: แก้ไขแต่ละส่วนได้อิสระ
- 👥 **ทำงานร่วมกันได้ดี**: หลายคนแก้ไขพร้อมกันได้
- 🎨 **เน้นงานเฉพาะ**: Designer จัดการ CSS, Developer จัดการ JS
- 📝 **เทสต์ง่าย**: ทดสอบแต่ละส่วนได้อิสระ

## เทคโนโลยีที่ใช้

- **Vue 3**: JavaScript Framework
- **Vuetify 3**: Material Design Component Library
- **Vue Router**: Client-side routing
- **Vite**: Build tool และ dev server
- **Material Design Icons**: Icon library
