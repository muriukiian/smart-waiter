const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, required:true, enum:["manager","kitchen","barman","room service", "waiter/waitress","admin"]}
}, {timestamps:true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;