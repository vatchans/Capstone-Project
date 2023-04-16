var express = require('express');
var router = express.Router();
const {dburl} = require('../public/dbconfig/DB')
const mongoose = require('mongoose')
const {Products}=require('../public/dbconfig/Schema/ProductSchema')

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })

router.post("/Add_Products",async(req,res)=>{
    try{
     let Product= await Products.create(req.body)
     res.status(201).send("Added Successfully ")
    }
    catch(error){
      res.status(500).send("Internal server error")
    }
})
router.get("/getAll_Products",async(req,res)=>{
  try{
    let Product=await Products.find()
    res.status(200).send(Product)
  }
  catch(error){
    res.status(500).send("Internal server error")
  }
})
router.post("/Edit_Product/:id",async(req,res)=>{
  try{
    let Product=await Products.updateOne({_id:req.params.id},{
      $set:{
        Product_name:req.body.Product_name,
        Product_Category:req.body.Product_Category,
        Product_Image:req.body.Product_Image,
        Product_Price:req.body.Product_Price,
        Product_discription:req.body.Product_discription
      }
    })
    res.status(200).send("Changes made Successfully")
  }
  catch(error){
    res.status(500).send("Internal server error")
  }
})


router.delete('/delete_Product/:id',async(req,res)=>{
  try{
    let Product=await Products.deleteOne({_id:req.params.id})
    res.status(200).send("Product removed successfully")
  }
  catch(error){
    res.status(500).send("Internal server error")
  }
})

router.get('/view_Product/:id',async(req,res)=>{
 try{
    let Product=await Products.findOne({_id:req.params.id})
     res.status(200).send([Product])
 }catch(error){
     res.status(500).send("Internal server error")
 }
})
router.put("/Edit_Product/:id",async(req,res)=>{
    try{
    let Product=await Products.updateOne({_id:req.params.id},{
        $set:{
           Product_name:req.body.Product_name,
           Product_Image:req.body.Product_Image,
           Product_discription:req.body.Product_discription,
           Product_Price:req.body.Product_Price
        }
      })
      
      res.status(201).send({msg:"Changes made successfully"})
    }
    catch(error){
     res.status(500).send("Internal server error")
    }
  })

router.delete("/Delete_Product/:id",async(req,res)=>{
    try{
      let Product=await Products.findOneAndDelete({_id:req.params.id})
      res.status(200).send("Product Deleted")
    }
    catch(error){
      res.status.send(error)
    }
  })


module.exports=router