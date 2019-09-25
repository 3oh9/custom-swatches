module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  define: process.env.DB_DEFINE_TIMESTAMPS,
  logging: false,
  dialectOptions: {
    ssl: true,
  },
  pool: {
    max: Number(process.env.DB_MAX),
    min: Number(process.env.DB_MIN),
    acquire: Number(process.env.DB_CONNECTION_TIMEOUT),
    idle: Number(process.env.DB_IDLE_TIMEOUT),
    evict: Number(process.env.DB_CONNECTION_EVICT),
    handleDisconnects: process.env.DB_HANDLE_DISCONNECTS,
  },
};
