const env = process.env.ENVIRONMENT || "prod";

const PostGresDbConfig = {
  dev: {
    host: process.env.devPGDBHost,
    port: process.env.devPGDBPort,
    dbName: process.env.devPGDBDbName,
    userName: process.env.devPGDBUserName,
    password: process.env.devPGDBPassword,
  },
  prod: {
    host: process.env.prodPGDBHost,
    port: process.env.prodPGDBPort || 5432,
    dbName: process.env.prodPGDBDbName,
    userName: process.env.prodPGDBUserName,
    password: process.env.prodPGDBPassword,
  },
};

module.exports = {
  postGresDbConfig: PostGresDbConfig[env],
};
