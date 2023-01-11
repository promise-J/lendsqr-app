import type { Knex } from "knex";
import * as dotenv from 'dotenv'
dotenv.config()
// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
        connection: {
            host: "localhost",
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
          directory: './src/db/migrations'
        }
  },
  test: {
    client: "mysql2",
        connection: {
            host: "localhost",
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME_TEST
        },
        migrations: {
          directory: './src/db/migrations'
        }
  },

  staging: {
    client: "mysql2",
        connection: {
            host: "localhost",
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql2",
    connection: {
        host: "localhost",
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME_PROD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config
// module.exports = config;
