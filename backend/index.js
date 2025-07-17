const {createTodo, updateTodo} = require("./type")
const {todo} = require("./db")
const cors = require("cors")
const express = require("express")
const app = express()
const PORT = process.env.PORT ||  3000

app.use(cors())
app.use(express.json())

app.post("/todo", async (req, res) => {
  const todoItem = req.body.todo;
  const description = req.body.description;

  console.log(todoItem, description)

  const isTodoValid = createTodo.safeParse({
    title: todoItem,
    description: description,
  });

  
  if (!isTodoValid.success) {
    res.status(404).json({
      msg: "Correct your details and submit again",
    });
    return
  } 

    try {
      console.log("in the try block")
      await todo.create({
        title: todoItem,
        description: description,
        completed :  false
      });

      res.status(200).json({
        msg: "TODO has been created",

      });
    } catch (err) {
      res.status(404).json({
        msg: err,
      });
  }
});

app.get("/todo", async (req,res)=>{
  const todos = await todo.find({})
  res.status(200).json({
    todos : todos
  })
})


app.put("/completed",async (req,res)=>{
  const  reqBody = req.body
  const isIdValid = updateTodo.safeParse(reqBody)
  // console.log("the  req body is", reqBody)
  console.log(isIdValid)
  if(!isIdValid.success){
    res.status(404).json({
      msg : "Enter a valid id"
    })
    return
  }

  const updateStatus = await todo.findByIdAndUpdate(reqBody.id, { completed: true })
  console.log("the updates status is", updateStatus)
  res.status(200).json({
    msg : "Todo updated"
  })
})

app.listen(PORT, (error)=>{
  if(!error){
  console.log(`TODO backend running on PORT : ${PORT}, http://localhost:${PORT}`)
  }else{
    console.log( `Error starting the backend server on PORT : ${PORT}`)
  }
})