const mongoose=require('mongoose')

const Product_schema=new mongoose.Schema({
    Product_Category:{type:String,require:true},
    Product_name:{type:String,require:true},
    Product_discription:{type:String,require:true},
    Product_Image:{type:String,require:true},
    Product_Quantity:{type:Number,default:1},
    Product_Price:{type:Number,require:true}
})

const Products=mongoose.model("Products",Product_schema)
module.exports={Products}