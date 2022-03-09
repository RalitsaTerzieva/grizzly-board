require('dotenv').config(); // this is important!

module.exports = {
  "development": {
    "url": process.env.DATABASE_URL,
    "dialect": "postgres",
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:",
  },
  "production": {
    "url": `${process.env.DATABASE_URL}`,
    "dialectOptions": {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
    "dialect": "postgres",
  }
}