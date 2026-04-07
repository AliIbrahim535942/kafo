import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./common/LanguageSwitcher";
import ThemeToggle from "./common/ThemeToggle";

function AppNavbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand" to="/">
          <span className="brand-mark">EA</span>
          <span>{t("app.name")}</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {t("nav.products")}
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    {t("nav.cart")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/invoices">
                    {t("nav.ordersInvoices")}
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  {t("nav.adminDashboard")}
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <span className="navbar-user">{user?.name}</span>
                <button className="btn btn-sm btn-ghost" onClick={handleLogout}>
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link className="btn btn-sm btn-ghost" to="/login">
                  {t("nav.login")}
                </Link>
                <Link className="btn btn-sm btn-accent" to="/register">
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
