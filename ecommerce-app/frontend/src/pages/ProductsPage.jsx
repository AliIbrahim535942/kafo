import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useAuth } from "../context/AuthContext";
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

function ProductsPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await getProducts({ search, category });
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleFilter = async (e) => {
    e.preventDefault();
    await loadProducts();
  };

  const handleAdd = async (productId) => {
    if (!isAuthenticated || isAdmin) return;

    try {
      await addToCart(productId, 1);
      showToast(t("toasts.addedToCart"));
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  const productsCount = useMemo(() => products.length, [products]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="page-hero mb-4">
        <h2 className="mb-2">{t("products.title")}</h2>
        <p className="text-muted mb-0">{t("app.productHub")}</p>
      </div>

      <form className="row g-2 mb-3" onSubmit={handleFilter}>
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder={t("products.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{t("products.allCategories")}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {t(`categories.${cat}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 d-grid">
          <button className="btn btn-primary rounded-pill">
            {t("common.apply")}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      <p className="text-muted">
        {t("products.found", { count: productsCount })}
      </p>

      {loading ? (
        <LoadingSpinner label={t("common.loading")} />
      ) : products.length === 0 ? (
        <div className="empty-state card p-4 text-center">
          {t("common.emptyProducts")}
        </div>
      ) : (
        <div className="row g-3">
          {products.map((product) => (
            <div className="col-md-4 col-lg-3" key={product._id}>
              <ProductCard
                product={product}
                onAddToCart={isAdmin ? null : handleAdd}
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ProductsPage;
