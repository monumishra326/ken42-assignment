const express=require("express")


const router=express.Router()



const Event=require("../models/product.model")


router.get("/",async (req,res)=>{

    const event= await Event.find({}).lean().exec()
    return res.status(200).send({event})


})
module.exports=router