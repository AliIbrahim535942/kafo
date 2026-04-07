import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../services/cartService";
import LoadingSpinner from "../components/common/LoadingSpinner";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantity = async (productId, quantity) => {
    try {
      await updateCartQuantity(productId, Number(quantity));
      await loadCart();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update quantity");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      await loadCart();
    } catch (err) {
      setError(err.response?.data?.message || "Could not remove item");
    }
  };

  if (loading) {
    return <LoadingSpinner label={t("cart.loading")} />;
  }

  if (!cart) {
    return (
      <div className="alert alert-warning">{error || t("common.noData")}</div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="mb-3">{t("cart.title")}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {cart.items.length === 0 ? (
        <div className="empty-state card p-4 text-center">
          {t("cart.cartEmpty")}
        </div>
      ) : (
        <div className="card border-0 shadow-soft p-3">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>{t("cart.product")}</th>
                  <th>{t("cart.price")}</th>
                  <th>{t("cart.quantity")}</th>
                  <th>{t("cart.total")}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.product._id}>
                    <td>{item.product.title}</td>
                    <td>${item.unitPrice}</td>
                    <td style={{ width: "120px" }}>
                      <input
                        type="number"
                        className="form-control form-control-sm rounded-pill"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantity(item.product._id, e.target.value)
                        }
                      />
                    </td>
                    <td>${(item.quantity * item.unitPrice).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill"
                        onClick={() => handleRemove(item.product._id)}
                      >
                        {t("common.remove")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5 className="mb-0">
              {t("cart.total")}: ${cart.totalPrice.toFixed(2)}
            </h5>
            <Link className="btn btn-success rounded-pill" to="/checkout">
              {t("cart.proceed")}
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CartPage;
