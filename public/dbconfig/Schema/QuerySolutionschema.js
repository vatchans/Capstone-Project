const mongoose=require('mongoose')
const validator=require('validator')
const resolved_query_schema=new mongoose.Schema({
    Query_id:{type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true},
    User_name:{type:String,required:true},
    User_id:{type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,},
    admin_id:{type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true},
    title:{type:String,required:true},
    Reason:{type:String,require:true},
    Status:{type:String,default:"Resolved"},
    Solution:{type:String,required:true},
    resolved_on:{type:String,default:Date},
})

const Closed_queries=mongoose.model("Closed_Quires",resolved_query_schema)
module.exports={Closed_queries}
