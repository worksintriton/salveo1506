var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Doctor = require('./../models/DoctorModel');
var Payment = require('./../models/PaymentModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());

router.post('/signup',  async function(req, res) {
try {
        var query = {"Email": req.body.Email};
        var lat = req.body.lat;
        var long = req.body.long;
        let fields = {
          "Pic": req.body.Pic || "",
          "Name": req.body.Name || "", 
          "DOB" : req.body.DOB || "",
          "Type" : req.body.Type || "",
         "Languages": req.body.Languages || "",
          "Email": req.body.Email || "",
           "Password": req.body.Password || "",
            "Phone": req.body.Phone || "",
         "Qualifications" : req.body.Qualifications || "",
         "HighestQualifications": req.body.HighestQualifications || "",
         "Specilization": req.body.Specilization || "",
         "Year_of_Passout": req.body.YearPassing || "",
          "Current_location": { 
              "type": "Point",
              "coordinates": [long,lat]
            },
         "Experience": req.body.Experience || "",
         "Current_employee_id": req.body.Current_employee_id || "",
         "EmployeeAt": req.body.EmployeeAt || "",
         "AvailableHours": req.body. AvailableHours || "",
         "OnlineConsultant": req.body.OnlineConsultant || "",
         "Information": req.body.Information || "",
          "Updated_At" : req.body.Updated_At || "",
          "last_login_time": req.body.last_login_time || "",
          "Available_type": req.body.Available_type || "",
          "Service": req.body.Service || "",
          "Special_mention":req.body.Special_mention || "",
          "Charge_Per_15min":req.body.Charge_Per_15min || "",
          "File_list":req.body.Charge_Per_15min || "",
          "signature": req.body.signature || "",
          "Salveo_Price" : 0,
          "Verification_Status": "not verified"
        }
       var Inserteddata = await Doctor.findOneAndUpdate(query,fields,{new: true});
       var Inserteddataa = await Doctor.create(fields);

            res.json({Status:"Success",Message:"Doctor registration successfully", Data :Inserteddataa,Code:200});
          
}
        catch(e){
          console.log(e)
           res.json({Status:"Failed",Message:"Internal server error", Data :{},Code:300});
        }

});

router.post('/login',  async function(req, res) {
      try{

    var Datacheck = await Doctor.findOne({Email:req.body.Email, Password:req.body.Password});
    console.log(Datacheck);
    if(Datacheck == null){
     res.json({Status:"Failed",Message:"User not found", Data : {},Code:300});
    }
    else if(Datacheck.Verification_Status == "not verified")
    {
       res.json({Status:"Failed",Message:"Email id not yet verified", Data :{},Code:300});
    }
    else
    {
      res.json({Status:"Success",Message:"Login Successful", Data : Datacheck ,Code:200});
    }  
  }
  catch(e){
       console.log(e)
       res.json({Status:"Failed",Message:"Internal server issue", Data :{},Code:500});
     }    
  });

router.post('/forgotpassword',  function(req, res) {

      Doctor.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var password = await Doctor.find({Email:req.body.Email}).select('password');
        console.log(password);
       var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'anjani513devi@gmail.com',
            pass: 'anjanichotu@24'
          }
        });

        var mailOptions = {
          to: req.body.Email,
          subject: 'Forgot password Mail',
          text: "Please check your password" +password,
      };
       transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log("erorr related the mail ", error);
          } else {
          console.log('Email sent: ' + info.response);
          }
        });
        res.success(200, "Password has been sent to the registered Email ID");
      });

});

router.get('/getlist', function (req, res) {
        Doctor.find({}, function (err, doctors) {
            if (err) return res.status(500).send("There was a problem finding the Doctors.");
          res.json({Status:"Success",Message:"Data Update successfully", Data : doctors,Code:200});
        });
});

router.post('/getpaylist', function (req, res) {
        Payment.find({Doctor_email_id:req.body.Email}, function (err, doctors) {
            if (err) return res.status(500).send("There was a problem finding the Doctors.");
          res.json({Status:"Success",Message:"Data Update successfully", Data : doctors,Code:200});
        });
});

router.post('/getdoclist', function (req, res) {
        Doctor.find({}, function (err, doctors) {
            if (err) return res.status(500).send("There was a problem finding the Doctors.");
          res.json({Status:"Success",Message:"Data Update successfully", Data : doctors,Code:200});
        });
});


router.post('/getdoclist_byspec', function (req, res) {
        Doctor.find({}, function (err, doctors) {
            if (err) return res.status(500).send("There was a problem finding the Doctors.");
          res.json({Status:"Success",Message:"Data Update successfully", Data : doctors,Code:200});
        });
});

router.get('/deletes', function (req, res) {
      Doctor.remove({}, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
             res.json({Status:"Success",Message:"Doctor Details Deleted", Data : {} ,Code:200});     
      });
});

router.post('/edit', function (req, res) {
        Doctor.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, data) {
          console.log(err);
            if (err) return res.status(500).send("There was a problem updating the user.");
             Doctor.findOne({ Email: req.body.Email }, async function (err, user) {
              var DoctorDetails = await Doctor.findOne({Email:req.body.Email});
              res.json({Status:"Success",Message:"Data Update successfully", Data : DoctorDetails,Code:200});
             });
        });
});

// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Doctor.findByIdAndRemove(req.params.id, function (err, data) {
          if (err) return res.status(500).send("There was a problem deleting the data.");
          res.success(200, "Data Deleted Successfully");
      });
});

module.exports = router;
