const mongoose=require("mongoose");

const covidSchema=new mongoose.Schema({
name:{
type:String,
required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
mobile:{
    type:Number,
    required:true,
    unique:true
},
gender:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
},
address:{
    type:String,
    required:true
},
address2:{
    type:String,
    required:true
},
address3:{
    type:String,
    required:true
},
pincode:{
    type:Number,
    required:true
},
details:{
    type:String,
    required:true
}
});


const Helper = new mongoose.model("CovidHelper",covidSchema);

module.exports=Helper;