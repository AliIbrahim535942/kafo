import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { forgotPassword } from "../services/authService";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await forgotPassword({ email });
      setMessage(
        `${data.message}. Demo reset link: ${data.resetLink || "check backend logs"}`,
      );
    } catch (err) {
      setError(err.response?.data?.message || t("auth.requestFailed"));
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <motion.div
          className="auth-card card p-4 shadow-soft"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="mb-1">{t("auth.forgotPassword")}</h3>
          <p className="text-muted mb-3">{t("auth.sendResetLink")}</p>
          {message && <div className="alert alert-info">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t("auth.email")}</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary rounded-pill">
              {t("auth.sendResetLink")}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
