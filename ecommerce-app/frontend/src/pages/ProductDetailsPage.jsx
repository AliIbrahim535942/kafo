import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getProductById, rateProduct } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";

const backendBase = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).replace("/api", "");

function ProductDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, isAdmin } = useAuth();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(id, 1);
      showToast(t("toasts.addedToCart"));
      setMessage(t("productDetails.addSuccess"));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  const handleRate = async () => {
    try {
      const data = await rateProduct(id, Number(rating));
      setProduct(data);
      setMessage(t("productDetails.saveRating"));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  if (loading) {
    return <LoadingSpinner label={t("common.loading")} />;
  }

  if (!product) {
    return (
      <div className="alert alert-warning">{error || t("common.noData")}</div>
    );
  }

  return (
    <motion.div
      className="row g-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="col-md-5">
        {product.image ? (
          <img
            src={`${backendBase}${product.image}`}
            alt={product.title}
            className="img-fluid rounded border"
          />
        ) : (
          <div className="placeholder-image rounded border d-flex align-items-center justify-content-center">
            {t("products.noImage")}
          </div>
        )}
      </div>

      <div className="col-md-7">
        <h2>{product.title}</h2>
        <p className="text-muted">
          {t("productDetails.category")}: {t(`categories.${product.category}`)}
        </p>
        <p>{product.description}</p>
        <p>
          {t("products.barcode")}: {product.barcode}
        </p>
        <p>
          {t("products.rating")}: {product.rating || 0}
        </p>

        <div className="mb-3">
          {product.hasDiscount && product.discountedPrice ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-decoration-line-through text-muted me-2">
                ${product.price}
              </span>
              <span className="fw-bold text-danger">
                ${product.discountedPrice}
              </span>
            </div>
          ) : (
            <span className="fw-bold">${product.price}</span>
          )}
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {isAuthenticated && !isAdmin && (
          <div className="d-flex gap-2 mb-3">
            <button
              className="btn btn-primary rounded-pill"
              onClick={handleAddToCart}
            >
              {t("products.addToCart")}
            </button>
            <div className="d-flex gap-2">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-select"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={handleRate}
              >
                {t("productDetails.rate")}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProductDetailsPage;
