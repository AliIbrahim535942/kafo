const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  "Groceries",
  "Automotive",
];

const DELIVERY_METHODS = {
  standard: { label: "Standard (3-5 days)", price: 5 },
  express: { label: "Express (1-2 days)", price: 10 },
  sameDay: { label: "Same Day", price: 20 },
};

module.exports = {
  CATEGORIES,
  DELIVERY_METHODS,
};
