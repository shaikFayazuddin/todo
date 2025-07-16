const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://100xDevFayaz:fayazuddin@cluster0.x82q5ks.mongodb.net/')

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