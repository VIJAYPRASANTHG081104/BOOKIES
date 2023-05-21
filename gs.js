const express=require('express')
const app=express()
app.listen(2000,(req,res)=>{
    console.log("the port were sta")
})
app.get('/hero',(Req,res)=>{
    res.send("hello")
})