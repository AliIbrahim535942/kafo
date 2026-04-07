import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { checkout } from "../services/orderService";
import { useToast } from "../context/ToastContext";

function CheckoutPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    location: "",
    cardHolder: "",
    cardNumber: "",
    deliveryMethod: "standard",
    couponCode: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await checkout({
        location: form.location,
        paymentInfo: {
          cardHolder: form.cardHolder,
          cardNumber: form.cardNumber,
        },
        deliveryMethod: form.deliveryMethod,
        couponCode: form.couponCode,
      });

      if (data.paymentStatus === "failed") {
        setError(t("checkout.failedPayment"));
      } else {
        setMessage(t("checkout.successPayment"));
        showToast(t("toasts.orderCreated"));
      }
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    }
  };

  return (
    <motion.div
      className="row justify-content-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="col-md-8">
        <div className="page-hero mb-4">
          <h2>{t("checkout.title")}</h2>
          <p className="text-muted mb-0">{t("checkout.freeShipping")}</p>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="card p-4 shadow-soft border-0">
          <div className="mb-3">
            <label className="form-label">{t("checkout.location")}</label>
            <input
              className="form-control"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <label className="form-label">{t("checkout.cardHolder")}</label>
              <input
                className="form-control"
                value={form.cardHolder}
                onChange={(e) =>
                  setForm({ ...form, cardHolder: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("checkout.cardNumber")}</label>
              <input
                className="form-control"
                value={form.cardNumber}
                onChange={(e) =>
                  setForm({ ...form, cardNumber: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">{t("checkout.deliveryMethod")}</label>
            <select
              className="form-select"
              value={form.deliveryMethod}
              onChange={(e) =>
                setForm({ ...form, deliveryMethod: e.target.value })
              }
            >
              <option value="standard">{t("checkout.standard")}</option>
              <option value="express">{t("checkout.express")}</option>
              <option value="sameDay">{t("checkout.sameDay")}</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">{t("checkout.couponCode")}</label>
            <input
              className="form-control"
              value={form.couponCode}
              onChange={(e) => setForm({ ...form, couponCode: e.target.value })}
              placeholder="CPN-XXXX"
            />
          </div>

          <button className="btn btn-primary rounded-pill">
            {t("checkout.placeOrder")}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default CheckoutPage;
