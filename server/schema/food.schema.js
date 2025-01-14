const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true}
},{timestamps:true});

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

module.exports = Food;