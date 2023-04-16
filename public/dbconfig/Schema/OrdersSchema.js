const mongoose=require('mongoose')

const OrdersSchema=new mongoose.Schema(
    {
        Product_id:{type:mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,},
        User_id:{type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,},
        Product_name:{type:String},
        Products_Price:{type:Number},
        Product_Image:{type:String},
        Payment_mode:{type:String},
        Product_Category:{type:String,require:true},
        Ordered_on:{type:String,default:Date},
        transcation_id:{type:String}
    }
)
const Orders=mongoose.model("Orders",OrdersSchema)
module.exports={Orders}