const mongoose = require("mongoose");

const beverageSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true}
}, {timestamps:true})

const Beverage = mongoose.models.Beverage || mongoose.model("Beverage", beverageSchema);

module.exports = Beverage;