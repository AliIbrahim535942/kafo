# Backend - شرح بالعربي

هذا الجزء مسؤول عن:

- API
- المصادقة والصلاحيات
- إدارة المنتجات والسلة والطلبات والفواتير
- منطق النقاط والكوبونات
- رفع الصور محليًا

## 1) التقنيات المستخدمة

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT (Access Token)
- bcrypt
- nodemailer
- Joi
- multer

## 2) بنية المجلدات

```bash
backend/
  src/
    config/
      db.js
    controllers/
    middlewares/
    models/
    routes/
    services/
    utils/
    validations/
    app.js
    server.js
    seed.js
  uploads/
  .env.example
  package.json
  README.md
```

## 3) شرح سريع لكل طبقة

- models:
  - تعريف جداول/مخططات MongoDB (User, Product, Cart, Order, Invoice...)
- controllers:
  - استقبال الطلبات والردود HTTP فقط
- services:
  - منطق العمل الحقيقي (business logic)
- validations:
  - التحقق من المدخلات باستخدام Joi
- middlewares:
  - JWT auth, role check, upload, error handler
- routes:
  - ربط المسارات بالـ controllers
- utils:
  - ثوابت، توليد توكن، الإيميل، الكوبونات

## 4) كيفية التشغيل

1. ادخل إلى مجلد backend
2. ثبّت الحزم:
   ```bash
   npm install
   ```
3. أنشئ ملف `.env` من `.env.example`
4. شغّل بيانات البداية:
   ```bash
   npm run seed
   ```
5. شغّل السيرفر:
   ```bash
   npm run dev
   ```

السيرفر الافتراضي يعمل على:

- `http://localhost:5000`

## 5) متغيرات البيئة

مثال موجود في `.env.example`:

- `PORT`: منفذ السيرفر
- `MONGODB_URI`: رابط MongoDB Atlas
- `JWT_SECRET`: سر توليد JWT
- `FRONTEND_URL`: رابط الواجهة (مهم في reset link)
- `ADMIN_EMAIL`: بريد الأدمن الأساسي
- `ADMIN_PASSWORD`: كلمة مرور الأدمن
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: إعدادات SMTP (اختياري)
- `MAIL_FROM`: البريد المرسل

## 6) قواعد مهمة مطبقة

- فقط الأدمن يستطيع:
  - إضافة/تعديل/حذف المنتجات
  - إضافة خصومات
  - عرض جميع الطلبات والفواتير
- العميل يستطيع:
  - التصفح والبحث والتصفية
  - التقييم مرة واحدة لكل منتج
  - إدارة السلة
  - تنفيذ Checkout
  - مشاهدة طلباته وفواتيره
- التوصيل مجاني إذا `subtotal > 100`
- نظام النقاط والكوبونات مفعّل بعد الطلبات الناجحة

## 7) Endpoint Summary

- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`
- Products:
  - `GET /api/products`
  - `GET /api/products/:id`
  - `POST /api/products` (admin)
  - `PUT /api/products/:id` (admin)
  - `DELETE /api/products/:id` (admin)
  - `PATCH /api/products/:id/discount` (admin)
  - `POST /api/products/:id/rate` (customer)
- Cart:
  - `GET /api/cart`
  - `POST /api/cart/add`
  - `PATCH /api/cart/quantity`
  - `DELETE /api/cart/:productId`
- Orders:
  - `POST /api/orders/checkout`
  - `GET /api/orders/my`
  - `GET /api/orders` (admin)
  - `GET /api/orders/admin/stats` (admin)
- Invoices:
  - `GET /api/invoices/my`
  - `GET /api/invoices` (admin)
