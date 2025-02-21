const mongoose = require('mongoose');

const ComplainSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    severity: String,
    votes:{
        type:Number,
        default:0
    },
    resolved: { 
        type: Boolean, 
        default: false 
    },
    resolvedBy: { 
        type: String 
    },
    responsible: { 
        type:String 
    }
});

module.exports = mongoose.model('complaint', ComplainSchema);
