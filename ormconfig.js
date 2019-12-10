require("dotenv/config");

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-unresolved
const { NamingStrategy } = require("./dist/lib/NamingStrategy");

const { DATABASE_URL, DATABASE_TIMEZONE, DATABASE_SSL } = process.env;

module.exports = {
  type: DATABASE_URL.replace(/^(.*?):\/\/.*?$/, "$1"),
  url: DATABASE_URL,
  timezone: DATABASE_TIMEZONE,
  ...(DATABASE_SSL === "true"
    ? {
        extra: {
          ssl: true
        }
      }
    : {}),
  entities: ["dist/models/**/*{.ts,.js}"],
  synchronize: true,
  namingStrategy: new NamingStrategy()
};
