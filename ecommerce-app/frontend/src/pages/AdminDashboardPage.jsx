import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  addDiscount,
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";
import { getAllOrders, getAdminStats } from "../services/orderService";
import { getAllInvoices } from "../services/invoiceService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  "Groceries",
  "Automotive",
];

function AdminDashboardPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    price: "",
    barcode: "",
    category: categories[0],
    stock: 10,
    isBestSeller: false,
    image: null,
  });

  const [discountProductId, setDiscountProductId] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      const [statsData, ordersData, invoicesData, productsData] =
        await Promise.all([
          getAdminStats(),
          getAllOrders(),
          getAllInvoices(),
          getProducts(),
        ]);

      setStats(statsData);
      setOrders(ordersData);
      setInvoices(invoicesData);
      setProducts(productsData);

      if (!discountProductId && productsData.length > 0) {
        setDiscountProductId(productsData[0]._id);
      }
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(productForm).forEach(([key, value]) => {
        if (key === "image") return;
        formData.append(key, value);
      });

      if (productForm.image) {
        formData.append("image", productForm.image);
      }

      await createProduct(formData);
      showToast(t("toasts.productCreated"));
      setProductForm({
        title: "",
        description: "",
        price: "",
        barcode: "",
        category: categories[0],
        stock: 10,
        isBestSeller: false,
        image: null,
      });

      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      showToast(t("toasts.productDeleted"));
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  const handleEditProduct = async (product) => {
    const newTitle = prompt(
      `${t("common.edit")} ${t("products.title")}`,
      product.title,
    );
    if (!newTitle) return;

    const newPrice = prompt(
      `${t("common.edit")} ${t("common.price")}`,
      product.price,
    );
    if (!newPrice) return;

    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("description", product.description);
      formData.append("price", Number(newPrice));
      formData.append("barcode", product.barcode);
      formData.append("category", product.category);
      formData.append("stock", product.stock || 0);
      formData.append("isBestSeller", product.isBestSeller);

      await updateProduct(product._id, formData);
      showToast(t("toasts.productUpdated"));
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  const handleAddDiscount = async (e) => {
    e.preventDefault();

    try {
      await addDiscount(discountProductId, Number(discountedPrice));
      showToast(t("toasts.discountApplied"));
      setDiscountedPrice("");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  if (loading) {
    return <LoadingSpinner label={t("common.loading")} />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-hero mb-4">
        <h2>{t("admin.title")}</h2>
        <p className="text-muted mb-0">{t("app.productHub")}</p>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3">
              <h6>{t("admin.totalOrders")}</h6>
              <h4>{stats.ordersCount}</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h6>{t("admin.paidOrders")}</h6>
              <h4>{stats.paidOrders}</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h6>{t("admin.revenue")}</h6>
              <h4>${stats.revenue}</h4>
            </div>
          </div>
        </div>
      )}

      <div className="card p-3 mb-4">
        <h5>{t("admin.addProduct")}</h5>
        <form onSubmit={handleCreateProduct} className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder={t("auth.name")}
              value={productForm.title}
              onChange={(e) =>
                setProductForm({ ...productForm, title: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder={t("productDetails.description")}
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder={t("common.price")}
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder={t("products.barcode")}
              value={productForm.barcode}
              onChange={(e) =>
                setProductForm({ ...productForm, barcode: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={productForm.category}
              onChange={(e) =>
                setProductForm({ ...productForm, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {t(`categories.${cat}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder={t("common.stock")}
              value={productForm.stock}
              onChange={(e) =>
                setProductForm({ ...productForm, stock: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  image: e.target.files?.[0] || null,
                })
              }
            />
          </div>
          <div className="col-md-2 form-check mt-2 ms-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={productForm.isBestSeller}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  isBestSeller: e.target.checked,
                })
              }
              id="bestSellerCheck"
            />
            <label className="form-check-label" htmlFor="bestSellerCheck">
              {t("admin.bestSeller")}
            </label>
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-primary rounded-pill">
              {t("common.add")}
            </button>
          </div>
        </form>
      </div>

      <div className="card p-3 mb-4">
        <h5>{t("admin.addDiscount")}</h5>
        <form onSubmit={handleAddDiscount} className="row g-2">
          <div className="col-md-6">
            <select
              className="form-select"
              value={discountProductId}
              onChange={(e) => setDiscountProductId(e.target.value)}
              required
            >
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} ({t("common.current")}: ${p.price})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder={t("products.newPrice")}
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-warning rounded-pill">
              {t("admin.addDiscount")}
            </button>
          </div>
        </form>
      </div>

      <h5>{t("admin.products")}</h5>
      <div className="table-responsive mb-4">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>{t("products.title")}</th>
              <th>{t("products.category")}</th>
              <th>{t("common.price")}</th>
              <th>{t("products.discount")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{t(`categories.${product.category}`)}</td>
                <td>${product.price}</td>
                <td>
                  {product.hasDiscount
                    ? `$${product.discountedPrice}`
                    : t("common.noData")}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2 rounded-pill"
                    onClick={() => handleEditProduct(product)}
                  >
                    {t("common.edit")}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    {t("common.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5>{t("admin.orders")}</h5>
      <div className="table-responsive mb-4">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>{t("common.user")}</th>
              <th>{t("invoices.amount")}</th>
              <th>{t("invoices.payment")}</th>
              <th>{t("invoices.date")}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.email}</td>
                <td>${order.total}</td>
                <td>{order.paymentStatus}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5>{t("admin.invoices")}</h5>
      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>{t("common.user")}</th>
              <th>{t("invoices.order")}</th>
              <th>{t("invoices.amount")}</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.user?.email}</td>
                <td>{invoice.order?._id?.slice(-6)}</td>
                <td>${invoice.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default AdminDashboardPage;
