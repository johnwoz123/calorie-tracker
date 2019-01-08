module.exports = {
  port: process.env.PORT || 3001,
  db: {
    database: process.env.DB_NAME || 'calorietracker',
    user: process.env.DB_USER || 'calorietracker',
    password: process.env.DB_PASS || 'calorietracker',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './calorietracker.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};
