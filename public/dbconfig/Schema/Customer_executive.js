const mongoose=require('mongoose')
const validator=require('validator')
const userSchema=new mongoose.Schema({
    Email:{type:String,required:true,validate:(value)=>validator.isEmail(value)},
    Username:{type:String,required:true},
    Password:{type:String,required:true},
    Auth:{type:String},
    Mobile:{type:String,required:true,validate:(value)=>validator.isNumeric(value)&&value.length===10},
    CreatedAt:{type:Date,default:Date.now()},

},{
    versionkey:false
})
const CustomerExecutive=mongoose.model('Customer_executive',userSchema)
module.exports={CustomerExecutive}