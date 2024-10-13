const express = require('express');
const router  =require('./components');
const errorMiddleware = require('./middlewares/error');
const app = express();





app.use(express.json())
app.use("/api/v1/contact-app",router)

app.use(errorMiddleware);


app.listen(8000,()=>{
  console.log("started at 8000")
});









