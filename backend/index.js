const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const authRouter=require('./Routes/authRouter');
const productRouter = require('./Routes/productRouter');
require('dotenv').config();

require('./Models/db')

const PORT=process.env.PORT || 8080;

app.get("/ping",(req,res)=>{
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors());

app.use("/auth",authRouter);
app.use("/products",productRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})