const mongoose=require('mongoose')
const validator=require('validator')

const query_schema=new mongoose.Schema({
    User_name:{type:String,required:true},
    User_id:{type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,},
    title:{type:String,required:true},
    department:{type:String},
    Reason:{type:String,required:true},
    Image:{type:String},
    Status:{type:String,default:"Pending"},
    Mobile:{type:String,required:true,validate:(value)=>validator.isNumeric(value)&&value.length===10},
    Email:{type:String,required:true,validate:(value)=>validator.isEmail(value)},
    raised_on:{type:String,default:Date},
    Assigned_to:{type:String}
})

const Query=mongoose.model("Queries",query_schema)
module.exports={Query}