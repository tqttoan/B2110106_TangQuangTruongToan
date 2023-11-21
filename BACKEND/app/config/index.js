const config = {
  db: {
    uri:
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sales-management",
  },

  app: {
    port: process.env.PORT || 3000,
  },
};

module.exports = config;
