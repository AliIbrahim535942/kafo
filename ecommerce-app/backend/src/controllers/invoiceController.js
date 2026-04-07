const invoiceService = require("../services/invoiceService");

const getMyInvoices = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getUserInvoices(req.user._id);
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

const getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyInvoices,
  getAllInvoices,
};
