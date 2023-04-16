var express = require('express');
var router = express.Router();
const {dburl} = require('../public/dbconfig/DB')
const mongoose = require('mongoose')
const nodemailer =require('nodemailer');
const {Query}=require('../public/dbconfig/Schema/Queryschema')
const {Closed_queries}=require('../public/dbconfig/Schema/QuerySolutionschema')
const accountSid = "AC0e3df876528ac8fd1a0a329a5918d1f5";
const authToken = "f49380f1b0b998c3b06f758f150c2de2";
const client = require("twilio")(accountSid, authToken);


mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

router.post('/Raise_query',async(req,res)=>{
 try{
  let query=await Query.create(req.body)
  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    auth: {
      user: "vatchans@gmail.com",
      pass: "D2FDE1C28195576B0F29660C3D3D60467FBB",
    },
  });
  let info = await transporter.sendMail({
    from: 'vatchans@gmail.com',
    to: req.body.Email,
    subject:`A Update on your query  ${req.body.title}`, 
    html:`<p>Hey ${req.body.User_name} we have received your Query our team will be contacting you soon</p>`
    , 
  });

  res.status(201).send("Query Raised")
 }catch(error){
  res.status(500).send("Internal server error")
 }
})
router.post('/Accept_query/:id',async(req,res)=>{
    try{
      let query=await Query.updateOne({_id:req.params.id},{
        $set:{Status:"Processing",
    Assigned_to:req.body.Assigned_to}
      })
      let user=await Query.findOne({_id:req.params.id})
      let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
          user: "vatchans@gmail.com",
          pass: "D2FDE1C28195576B0F29660C3D3D60467FBB",
        },
      });
      let info = await transporter.sendMail({
        from: 'vatchans@gmail.com',
        to:user.Email,
        subject:`A Update on your query  ${req.body.title}`, 
        html:`<p>Hey ${user.User_name} we are Proceesing your Query.
        our Customer Executive ${req.body.Assigned_to} will be contacting you soon</p>`
        , 
      });
    res.status(200).send("Query Added to your Dashboard")
    }
    catch(error){
    res.status(500).send("Internal server Error")
    }
})

router.post("/resolve_Query",async(req,res)=>{
    try{
        let Solution=await Closed_queries.create(req.body)
        let query=await Query.findOne({_id:req.body.Query_id})
        let transporter = nodemailer.createTransport({
          host: "smtp.elasticemail.com",
          port: 2525,
          secure: false,
          auth: {
            user: "vatchans@gmail.com",
            pass: "D2FDE1C28195576B0F29660C3D3D60467FBB",
          },
        });
        let info = await transporter.sendMail({
          from: 'vatchans@gmail.com',
          to:query.Email,
          subject:`Your Query has resolved   -${req.body.title}`, 
          html:`${req.body.Solution}`})

          let delete_query =await Query.deleteOne({_id:req.body.Query_id})

        res.status(200).send("Query Resolved sucessfully")
    }
    catch(error){
        res.status(500).send("Internal server Error")
    }
})

router.get("/Pending_queries",async(req,res)=>{
    try{
      let query=await Query.find({
        Status:{$in:["Pending"]},
        Assigned_to:{$in:[""]}
    })
      res.status(200).send(query)
    }
    catch(error){
        res.status(500).send("Internal server Error")
    }
})

router.post("/My_Queries",async(req,res)=>{
    try{
        let query=await Query.find({Assigned_to:req.body.Assigned_to})
        res.status(200).send(query)
    }
    catch(error){
        res.status(500).send("Internal server Error")
    }
})
router.get("/Resolved_Queries_admin/:id",async(req,res)=>{
    try{
      let query=await Closed_queries.find({admin_id:req.params.id})
      res.status(200).send(query)
    }
    catch(error){
        res.status(500).send("Internal server error")
    }
})

router.get("/Resolved_Queries_user/:id",async(req,res)=>{
    try{
      let query=await Closed_queries.find({User_id:req.params.id})
      res.status(200).send(query)
    }
    catch(error){
        res.status(500).send("Internal server error")
    }
})

router.post('/Call',async()=>{
    client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: "+919361755429",
        from: "+15075708481",
      })
      .then(call => console.log(call.sid));
})

router.post('/verify_call',async(req,res)=>{
    client.validationRequests
  .create({friendlyName: 'My Home Phone Number', phoneNumber:'+919361755429'})
  .then(validation_request => console.log(validation_request.friendlyName));
})
module.exports = router;
