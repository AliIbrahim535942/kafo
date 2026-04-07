import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const backendBase = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).replace("/api", "");

function ProductCard({ product, onAddToCart }) {
  const { t } = useTranslation();

  return (
    <motion.div
      className="card h-100 product-card shadow-sm"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {product.image ? (
        <img
          src={`${backendBase}${product.image}`}
          className="card-img-top product-image"
          alt={product.title}
        />
      ) : (
        <div className="card-img-top product-image placeholder-image d-flex align-items-center justify-content-center">
          {t("products.noImage")}
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {product.isBestSeller && (
            <span className="badge rounded-pill text-bg-success">
              {t("products.bestSeller")}
            </span>
          )}
          {product.hasDiscount && (
            <span className="badge rounded-pill text-bg-warning">
              {t("products.discount")}
            </span>
          )}
        </div>
        <p className="small text-muted mb-1">
          {t("products.category")}: {t(`categories.${product.category}`)}
        </p>
        <p className="small text-muted mb-2">
          {t("products.rating")}: {product.rating || 0}
        </p>
        <p className="card-text small flex-grow-1">
          {product.description.slice(0, 70)}...
        </p>

        <div className="mb-3 price-block">
          {product.hasDiscount && product.discountedPrice ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-decoration-line-through text-muted small">
                ${product.price}
              </span>
              <span className="price-current">${product.discountedPrice}</span>
            </div>
          ) : (
            <span className="price-current">${product.price}</span>
          )}
        </div>

        <div className="d-flex gap-2">
          <Link
            to={`/products/${product._id}`}
            className="btn btn-outline-primary btn-sm flex-fill rounded-pill"
          >
            {t("products.details")}
          </Link>
          {onAddToCart && (
            <button
              className="btn btn-primary btn-sm flex-fill rounded-pill"
              onClick={() => onAddToCart(product._id)}
            >
              {t("products.addToCart")}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
