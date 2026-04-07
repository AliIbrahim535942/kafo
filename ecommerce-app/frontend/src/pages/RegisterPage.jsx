import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await register(form);
      setToken(data.token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || t("auth.registerFailed"));
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <motion.div
          className="auth-card card p-4 shadow-soft"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="mb-1">{t("auth.registerTitle")}</h3>
          <p className="text-muted mb-3">{t("auth.register")}</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t("auth.name")}</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("auth.email")}</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("auth.password")}</label>
              <input
                type="password"
                className="form-control"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-success w-100 rounded-pill">
              {t("auth.createAccount")}
            </button>
          </form>

          <div className="mt-3 text-center">
            <Link to="/login">{t("auth.alreadyHaveAccount")}</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterPage;
