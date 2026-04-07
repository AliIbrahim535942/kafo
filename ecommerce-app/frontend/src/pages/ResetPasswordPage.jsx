import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../services/authService";

function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = useMemo(() => params.get("token") || "", [params]);

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await resetPassword({ token, password });
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || t("auth.resetFailed"));
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
          <h3 className="mb-1">{t("auth.resetPassword")}</h3>
          <p className="text-muted mb-3">{t("auth.newPassword")}</p>
          {!token && (
            <div className="alert alert-warning">{t("auth.missingToken")}</div>
          )}
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t("auth.newPassword")}</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary rounded-pill" disabled={!token}>
              {t("auth.resetPassword")}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
