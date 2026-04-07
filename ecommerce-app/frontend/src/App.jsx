import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import InvoicesPage from "./pages/InvoicesPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PageTransition from "./components/PageTransition";
import { useTranslation } from "react-i18next";

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <AppNavbar />
      <div className="container py-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <ProductsPage />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <RegisterPage />
                </PageTransition>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PageTransition>
                  <ForgotPasswordPage />
                </PageTransition>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PageTransition>
                  <ResetPasswordPage />
                </PageTransition>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PageTransition>
                  <ProductDetailsPage />
                </PageTransition>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <CartPage />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <CheckoutPage />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <InvoicesPage />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <PageTransition>
                    <AdminDashboardPage />
                  </PageTransition>
                </AdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
