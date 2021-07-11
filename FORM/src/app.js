const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");
const mongodb=require('mongodb');
// const assert=require('assert');
var MongoClient= mongodb.MongoClient;

 var url="mongodb://localhost:27017/covidregistration";


const Helpers=require("./models/helpdata");
const { mongo } = require("mongoose");
const { Db } = require("mongodb");

const port= 8000;

// const static_path=path.join(__dirname, "../public" );
const tempelate_path=path.join(__dirname, "../tempelates/views" );
// const partials_path=path.join(__dirname, "../tempelates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//  app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",tempelate_path);
// hbs.registerPartials(partials_path);
app.use(express.static('pictures'));

app.get("/",(req,res) => {
    res.render("index");
});

app.get("/admin", (req,res) => {
    res.render("index");
});
// app.get("/get-data", (req,res) => {
//     res.render("get-data",{items:resultArray});
// });

 app.get("/get-data",function(req,res) {
    var resultArray=[];
    MongoClient.connect(url,function(err,client){
        if(err) throw err;
        var db=client.db('covidregistration');
var cursor= db.collection('covidhelpers').find();
cursor.forEach(function(doc,err){
if(!err)
resultArray.push(doc);
},function(){
    // db.close();
    res.render('get-data', {items: resultArray});
});
    });
});

// app.get("/get-data",(req,res) =>{
//     var resultArray=[];
// mongo.connect(url,function(err,db){
//     assert.equal(null,err);
//     var cursor=db.collection('covidhelpers').find();
//     cursor.forEach(function(doc,err){
//         assert.equal(null,err);
//         resultArray.push(doc);
//     },function(){
//         db.close();
//         res.render('get-data',{items:resultArray});
//     });
// });
// });

// app.post("/admin", async(req,res) => {
//     try{
//          const register1=new Helpers({
//         name:req.body.name,
//         email:req.body.email,
//         mobile:req.body.mobile,
//         gender:req.body.gender,
//         age:req.body.age,
//         address:req.body.address,
//         address2:req.body.address2,
//         address3:req.body.address3,
//         pincode:req.body.pincode,
//         details:req.body.details
//       });
// const reg=await register1.save();
// res.status(201).render("index");
//     }
//     catch(error){
//         res.status(400).send(error);
//     }
// res.redirect('/');
// });


app.post('/admin',function(req,res){
var item={
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            gender:req.body.gender,
            age:req.body.age,
            address:req.body.address,
            address2:req.body.address2,
            address3:req.body.address3,
            pincode:req.body.pincode,
            details:req.body.details
};
MongoClient.connect(url,function(err,client){
    if(err) throw err;
    var db=client.db('covidregistration');
    db.collection('covidhelpers').insertOne(item,function(err,result){
       if(!err)
        console.log("Item inserted");
        // db.close();
    });
   
});
res.redirect('/');
});

app.listen(port,() => {
    console.log(`Sever running at port ${port}`);
});