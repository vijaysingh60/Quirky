const mongoose = require('mongoose')
require("dotenv").config();
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err);
})

const userSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    flatCode: String,
    karmaPoints: {
        type: Number, 
        default: 10 
    },
    badges: [String]
})
module.exports = mongoose.model('user',userSchema);