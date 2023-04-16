const mongoose=require('mongoose')

const Cart_schema=new mongoose.Schema({
    Product_Category:{type:String,require:true},
    Product_id:{type:mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,},

    User_id:{type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,},
    Product_name:{type:String,require:true},
    Product_Image:{type:String,require:true},
    Product_Quantity:{type:Number,default:1},
    Product_Price:{type:Number,require:true}
})

const Cart=mongoose.model("Cart_items",Cart_schema)
module.exports={Cart}