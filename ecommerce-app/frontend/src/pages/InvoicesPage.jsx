import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getMyOrders } from "../services/orderService";
import { getMyInvoices } from "../services/invoiceService";
import LoadingSpinner from "../components/common/LoadingSpinner";

function InvoicesPage() {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, invoicesData] = await Promise.all([
        getMyOrders(),
        getMyInvoices(),
      ]);
      setOrders(ordersData);
      setInvoices(invoicesData);
    } catch (err) {
      setError(err.response?.data?.message || t("common.noData"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner label={t("common.loading")} />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="mb-3">{t("invoices.ordersTitle")}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card border-0 shadow-soft p-3 mb-4">
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>{t("invoices.id")}</th>
                <th>{t("invoices.amount")}</th>
                <th>{t("invoices.payment")}</th>
                <th>{t("invoices.delivery")}</th>
                <th>{t("invoices.date")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6)}</td>
                  <td>${order.total}</td>
                  <td>
                    {order.paymentStatus === "success"
                      ? t("common.success")
                      : t("common.failed")}
                  </td>
                  <td>{t(`checkout.${order.deliveryMethod}`)}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="mb-3">{t("invoices.invoicesTitle")}</h2>
      <div className="card border-0 shadow-soft p-3">
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>{t("invoices.id")}</th>
                <th>{t("invoices.order")}</th>
                <th>{t("invoices.amount")}</th>
                <th>{t("invoices.issuedAt")}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td>{invoice._id.slice(-6)}</td>
                  <td>{invoice.order?._id?.slice(-6) || "N/A"}</td>
                  <td>${invoice.amount}</td>
                  <td>{new Date(invoice.issuedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default InvoicesPage;
