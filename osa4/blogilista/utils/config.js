// environment variables
require('dotenv').config()

//let PORT = process.env.PORT
const PORT = 3003

const DB_name = "blogsspace"
// password is in the .env file which is gitignored
const MONGODB_URI =
    "mongodb+srv://FullPowerUser:"+process.env.DB_password+"@hvkbloggcluster.vqrpd.mongodb.net/"+DB_name+"?retryWrites=true&w=majority"

module.exports = {
    MONGODB_URI,
    PORT
}