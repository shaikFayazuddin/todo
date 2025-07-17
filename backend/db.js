const dotenv = require("dotenv")
dotenv.config();
const mongoose = require("mongoose")
const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl)

mongoose.connection.on("Connected", ()=>{
  console.log("Connected to db")
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  });

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
  });

const todoSchema = new mongoose.Schema({
  title : String,
  description : String,
  completed : Boolean
})

const todo = mongoose.model("todos", todoSchema)

module.exports = {
  todo : todo
}