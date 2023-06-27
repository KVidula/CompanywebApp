const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CompanyModel = mongoose.model('CompanyModel');

//add new company
router.post('/addcompany',(req,res)=>{
    const { company, location } = req.body;
    if(!company || !location){
        return res.status(400).json({error:"One or more mandatory fields are empty"});
    }

    const companyObj = new CompanyModel({companyName:company,location:location});
    companyObj.save()
    .then((newCompany)=>{
       res.status(201).json({company:newCompany});
    })
    .catch((error)=>{
        console.log(error);
    })
});

//get all company details
router.get('/companies',(req,res)=>{
    CompanyModel.find()
    .then((allcompanies)=>{
        res.status(200).json({Companies:allcompanies});
    })
    .catch((error)=>{
        console.log(error);
    })
});

//get company details by id
router.get('/company/:id',(req,res)=>{
    CompanyModel.findOne({_id:req.params.id})
    .then((company)=>{
        res.status(200).json({companydetails:company});
    })
    .catch((error)=>{
        console.log(error);
    })
});

//delete company
router.delete("/deletecompany/:id", (req,res) => {
    CompanyModel.findOne({_id: req.params.id})
    .exec((error,companyFound)=>{
      if(error || !companyFound){
         return res.status(400).json({error : "Company does not exist"});
      }else{
        companyFound.remove()
         .then((data)=>{
             res.status(200).json({result : data});
         }) 
         .catch((error)=>{
             console.log(error);
         })
        }
    }) 
 });   

 //edit company
router.put("/editcompany/:id", (req,res)=>{
    const { companyName, location } = req.body;
    if (!companyName || !location) {
        return res.status(400).json({ error: "one or more mandatory fields are empty" });
    }
    CompanyModel.updateOne({_id: req.params.id},{$set:{companyName:companyName,location:location}})
    .then((data)=>{
        res.status(200).json({result: data});
    })
    .catch((error)=>{
        console.log(error);
    })
});


 module.exports = router;
