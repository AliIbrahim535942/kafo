# Frontend - شرح بالعربي

هذا الجزء مسؤول عن واجهة المستخدم (UI) والتفاعل مع API.

## 1) التقنيات المستخدمة

- React.js
- React Router
- Axios
- Bootstrap

## 2) بنية المجلدات

```bash
frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx
    main.jsx
    styles.css
  .env.example
  package.json
  index.html
  README.md
```

## 3) شرح الأجزاء

- components:
  - عناصر واجهة قابلة لإعادة الاستخدام مثل Navbar وProductCard وحماية المسارات
- pages:
  - الصفحات المطلوبة (Login, Register, Products, Cart, Checkout, Admin...)
- services:
  - استدعاءات API عبر Axios
- context/AuthContext:
  - إدارة حالة المستخدم والتوكن بشكل بسيط

## 4) الصفحات المتوفرة

- Login
- Register
- Forgot Password
- Reset Password
- Products List (بحث + فلترة)
- Product Details (مع تقييم)
- Cart
- Checkout
- Orders / Invoices
- Admin Dashboard

## 5) كيفية التشغيل

1. ادخل إلى مجلد frontend
2. ثبّت الحزم:
   ```bash
   npm install
   ```
3. أنشئ ملف `.env` من `.env.example`
4. شغّل المشروع:
   ```bash
   npm run dev
   ```

الواجهة تعمل عادة على:

- `http://localhost:5173`

## 6) متغيرات البيئة

- `VITE_API_BASE_URL`
  - مثال: `http://localhost:5000/api`

## 7) نقاط مهمة

- عند تسجيل الدخول، يتم حفظ JWT في localStorage.
- الصفحة الرئيسية تعرض المنتجات مع الفلترة حسب 9 فئات محددة.
- عرض السعر القديم والجديد عند وجود خصم.
- الدفع في Checkout وهمي لتجربة السيناريو فقط.
- لوحة الإدارة مخصصة للمستخدم admin فقط.
