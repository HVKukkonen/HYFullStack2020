// environment variables
require('dotenv').config();

// let PORT = process.env.PORT
const PORT = 3003;

// const DB_name = "blogsspace";
// password is in the .env file which is gitignored
// const MONGODB_URI = "mongodb+srv://FullPowerUser:" + process.env.DB_password + "@hvkbloggcluster.vqrpd.mongodb.net/" + DB_name + "?retryWrites=true&w=majority"
let MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
