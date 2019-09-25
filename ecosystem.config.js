module.exports = {
  apps : [
    {
      name: "shopifyapp",
      exec_interpreter: "./node_modules/babel-cli/bin/babel-node.js",
      interpreter_args: ["--presets", "es2015"],
      script: "./src/server/index.js",
      watch: true,
      env: {
        "PORT": 3000,
        "NODE_ENV": "development"
      },
      env_production: {
        "PORT": 8080,
        "NODE_ENV": "production",
        "SHOPIFY_API_KEY": "",
        "SHOPIFY_API_SECRET": "",
        "DB_USER": "",
        "DB_PASSWORD": "#b3q",
        "DB_DATABASE": "",
        "DB_HOST": "",
        "DB_DIALECT": "postgres",
        "DB_PORT": "5432",
        "DB_DEFINE_TIMESTAMPS": "false",
        "DB_MAX": "5",
        "DB_MIN": "0",
        "DB_IDLE_TIMEOUT": "10000",
        "DB_CONNECTION_TIMEOUT": "10000",
        "DB_CONNECTION_EVICT": "10000",
        "DB_HANDLE_DISCONNECTS": "true",
        "API_PATH": "https://"
      }
    }
  ]
}