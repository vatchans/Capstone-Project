var express = require('express');
var router = express.Router();
const { dburl } = require('../public/dbconfig/DB')
const mongoose = require('mongoose')
const { Cart } = require('../public/dbconfig/Schema/CartSchema')
const {Products}=require('../public/dbconfig/Schema/ProductSchema')
const {Orders}=require('../public/dbconfig/Schema/OrdersSchema')
const Razorpay = require("razorpay");
const crypto = require("crypto") 
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })


router.post("/Add-to-cart", async (req, res) => {
    try {
        let item = await Cart.findOne({
            User_id: req.body.User_id
            , Product_name: req.body.Product_name
        })
        if (item) {
            res.status(400).send("Item Already added to Basket")
        }
        else {
            let cart = await Cart.create(req.body)
            res.status(201).send("Item added to Basket")
        }
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})

router.get('/getCart_items/:id', async (req, res) => {
    try {
        let cart = await Cart.find({ User_id: req.params.id })
        res.status(200).send(cart)
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})

router.post("/Increase_quanity/:id", async (req, res) => {
    try {

        let cart = await Cart.updateOne({ _id: req.params.id,
            Product_Quantity: { $lt: 10} }, {
            $inc: { Product_Quantity: 1 }
        },
        )
        
        let quantity= await Cart.find({ _id: req.params.id })
        let Price=await Products.find({_id:quantity[0].Product_id})
        let total=quantity[0].Product_Quantity*Price[0].Product_Price
             
        let cartq = await Cart.updateOne(
            { _id: req.params.id },
            { $set: { Product_Price:total}})

        res.status(200).send("updated")
    }
    catch {
        res.status(500).send("Internal server error")
    }
    
})

router.post("/decrease_quanity/:id", async (req, res) => {
    try {
        let cart = await Cart.updateOne({
            _id: req.params.id,

            Product_Quantity: { $gt: 1 }
        },
            { $inc: { Product_Quantity: -1 } }

        )
        let quantity= await Cart.find({ _id: req.params.id })
        let Price=await Products.find({_id:quantity[0].Product_id})
        let total=quantity[0].Product_Price-Price[0].Product_Price
             
        let cartq = await Cart.updateOne(
            { _id: req.params.id,
             Product_Price:{$gt:Price[0].Product_Price}},
            { $set: { Product_Price:total} })

        res.status(200).send("updated")
    }
    catch(error){
        res.status(500).send("Internal server error")
    }
})


router.post('/Payment',async(req,res)=>{
    try{
        var instance = new Razorpay({
            key_id: 'rzp_test_oYYYX4CEp1ZRoW',
            key_secret: 'h5p2s2cI9RTKun2sB1MdkVmI',
          });
          const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		}
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ message: "Something Went Wrong!" });
            }
            res.status(200).send(order);
        });
    }
    catch{
        res.status(500).send({ message: "Internal Server Error!" });
    }
})
router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256","h5p2s2cI9RTKun2sB1MdkVmI")
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
		 res.status(200).send("Payment verified successfully");
		} else {
		    res.status(400).send("Invalid signature sent");
           
		}
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
});

router.post('/orders',async(req,res)=>{
    try{
     let orders=await Orders.insertMany(req.body)
     res.status(201).send("Your Order is Confirmed")
    }
    catch(error){
        res.status(500).send("Internal Server Error!");
    }

})

router.get('/Allorders',async(req,res)=>{
    try{
        let orders=await Orders.find()
        res.status(200).send(orders)
       }
       catch(error){
           res.status(500).send("Internal Server Error!");
       }
})

router.get('/User_Orders/:id',async(req,res)=>{
    try{
        let orders=await Orders.find({User_id:req.params.id})
        res.status(200).send(orders)
       }
       catch(error){
           res.status(500).send("Internal Server Error!");
       }
})

router.get('/User_subscription/:id',async(req,res)=>{
    try{
        let orders=await Orders.find({User_id:req.params.id,Product_Category:"Subscription"})
        res.status(200).send(orders)
    }
    catch(error){
        res.status(500).send("Internal Server Error!");
    }
})

router.delete('/Clear_cart/:id',async(req,res)=>{
    try{
    let cart = await Cart.deleteMany({User_id:req.params.id})
    res.status(200).send('Cart items removed')
    }
    catch(error){
        res.status(500).send("Internal Server Error!");
    }
})


module.exports = router