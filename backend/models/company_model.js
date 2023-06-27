const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type : String,
        required : true
    },
    location: {
        type : String,
        required : true
    }
}, { timestamps:true }
);

mongoose.model("CompanyModel",companySchema);