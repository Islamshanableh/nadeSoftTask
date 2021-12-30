const mongoose = require('mongoose');


const nadeSchema = new mongoose.Schema({
    name:{type:Object},
    languages:{type:Object},
    cca2:{type:String},
    cca3:{type:String},
    ccn3:{type:String},
    currencies:{type:Object },
    region:{type:String},
    latlng:{type:Array },
})



    
module.exports=mongoose.model("Nade",nadeSchema)