module.exports = {
  development: {
    client: "mysql",
    connection: "mysql://root:paranthaman@localhost:3306/Turing",
    migrations: {
      directory: __dirname +"/migrations",
    },
  },
  production: {
    client: "mysql",
    connection: "mysql://root:paranthaman@localhost:3306/Turing",
  },
 };