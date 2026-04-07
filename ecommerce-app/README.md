# تطبيق متجر إلكتروني

هذا المشروع عبارة عن تطبيق متجر إلكتروني كامل ومقسّم بشكل بسيط إلى:

- [backend](backend) لإدارة API وMongoDB والمصادقة
- [frontend](frontend) لواجهة React

## المطلوب على الجهاز

قبل التشغيل تأكد من وجود:

- Node.js
- npm
- MongoDB Atlas أو MongoDB محلي إذا كنت ستجرب على جهازك
- متصفح حديث مثل Chrome أو Edge

## فكرة المشروع بسرعة

- المستخدم يقدر يسجل دخول أو ينشئ حساب
- يعرض المنتجات ويبحث ويفلتر حسب الفئة
- يضيف للسلة ويكمل الطلب
- يوجد Admin لإدارة المنتجات والطلبات والفواتير
- يوجد seed جاهز فيه Admin ومنتجات تجريبية

## هيكل المشروع

```bash
ecommerce-app/
  backend/
  frontend/
  README.md
```

## التشغيل خطوة بخطوة

### 1) تشغيل backend

1. ادخل إلى مجلد backend
2. ثبّت الحزم:
   ```bash
   npm install
   ```
3. انسخ ملف `.env.example` إلى `.env`
4. عدّل القيم داخل `.env`، خصوصًا:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
5. شغّل seed لإضافة الأدمن والبيانات التجريبية:
   ```bash
   npm run seed
   ```
6. شغّل السيرفر:
   ```bash
   npm run dev
   ```

### 2) تشغيل frontend

1. ادخل إلى مجلد frontend
2. ثبّت الحزم:
   ```bash
   npm install
   ```
3. انسخ ملف `.env.example` إلى `.env`
4. تأكد أن `VITE_API_BASE_URL` يشير إلى backend، مثل:
   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
5. شغّل الواجهة:
   ```bash
   npm run dev
   ```

## بيانات الـ Seed

- الأدمن يتم إنشاؤه من القيم الموجودة في ملف `.env`
- يتم إدخال منتجات تجريبية تلقائيًا

## ملاحظات مهمة

- الدفع وهمي فقط ولا يوجد بوابة دفع حقيقية
- الصور تُرفع محليًا داخل مجلد `backend/uploads`
- الواجهة تدعم العربية والإنجليزية مع RTL عند العربية
- يوجد وضع فاتح/داكن

## أين أجد الشرح التفصيلي؟

- شرح backend: [backend/README.md](backend/README.md)
- شرح frontend: [frontend/README.md](frontend/README.md)
