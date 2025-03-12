// import express from "express";
// import mongoose from "mongoose";
 

// const app = express();
// const port = 3002;

// app.use(express.json());  
// app.use(express.urlencoded({ extended: true }))
 


// const mongoURI = "mongodb+srv://irshad:irshadsheikh@cluster1.d60cj.mongodb.net/cluster1?retryWrites=true&w=majority";
// mongoose.connect(mongoURI,{});

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB");
// });


// const dataSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   cellphone1: { type: String, required: true },
//   cellphone2: { type: String, default: null },
//   homenumber: { type: String, default: null },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   emailid: { type: String, required: true, unique: true },
//   jobTitle: { type: String, required: true },
//   paymentMethod: { type: String, required: true },
//   dateOfBirth: { type: Date, required: true },
//   dateOfJoining: { type: Date, required: true },
//   languages: { type: [String], required: true },
//   ofPaidVacationDaysAllowed: { type: Number, required: true, default: 15 },
//   ofPaidSickVacationAllowed: { type: Number, required: true, default: 5 },
//   employeeStatus: { type: String, required: true, default: "Active" },
// });


// const User = mongoose.model("User", dataSchema);


// app.post("/add-user", async (req, res) => {
//   try {
// console.log("Recevived Data",req.body);
//     const newUser = new User({
//       name: req.body.name,
//       cellphone1: req.body.cellphone1,
//       cellphone2: req.body.cellphone2,
//       homenumber: req.body.homenumber,
//       address: req.body.address,
//       city: req.body.city,
//       state: req.body.state,
//       emailid: req.body.emailid,
//       jobTitle: req.body.jobTitle,
//       paymentMethod: req.body.paymentMethod,
//       dateOfBirth: req.body.dateOfBirth,
//       dateOfJoining: req.body.dateOfJoining,
//       languages: req.body.languages,
//       ofPaidVacationDaysAllowed: req.body.ofPaidVacationDaysAllowed,
//       ofPaidSickVacationAllowed: req.body.ofPaidSickVacationAllowed,
//       employeeStatus: req.body.employeeStatus
//     });

    
//     const savedUser = await newUser.save();
//     res.status(201).json({ message: "User added successfully!", user: savedUser });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error saving user data", error });
//   }
// });


// app.get("/users/:id", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id); 
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error retrieving user data", error });
//     }
//   });
   

// app.get("/users", async (req, res) => {
//     try {
//         const users = await User.find();
//       res.status(200).json(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error retrieving user data", error });
//     }
//   });
//    app.put("/users/:id", async (req, res) => {
//   const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json({ message: "User updated!", users: updateduser });
// });


// app.delete("/users/:id", async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "user deleted!" });
// });
 


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// {
//   "name": "md sheikh",
//   "cellphone1": "37563340",
//   "cellphone2": "0987654321",
//   "homenumber": "555123456",
//   "address": "indonasia",
//   "city": "sawai",
//   "state": "mp",
//   "emailid": "mdheikh@gmail.com",
//   "jobTitle": "employee",
//   "paymentMethod": "cash",
//   "dateOfBirth": "1990-01-01T00:00:00Z",
//   "dateOfJoining": "2020-05-15T00:00:00Z",
//   "languages": "English, Spanish",
//   "ofPaidVacationDaysAllowed": 12,
//   "ofPaidSickVacationAllowed": 5,
//   "employeeStatus": "Active"
// }

// const existingUser = await User.findOne({ email });


// exports.registerUser = catchAsyncErrors(async (req, res, next) => {
//     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//       folder: "avatars",
//       width: 150,
//       crop: "scale",
//     });
  
//     const { name, email, password } = req.body;
  
//     const user = await User.create({
//       name,
//       email,
//       password,
//       avatar: {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       },
//     });
  
//     sendToken(user, 201, res);
//   });
  
//   // Login User
//   exports.loginUser = catchAsyncErrors(async (req, res, next) => {
//     const { email, password } = req.body;
  
//     // checking if user has given password and email both
  
//     if (!email || !password) {
//       return next(new ErrorHander("Please Enter Email & Password", 400));
//     }
  
//     const user = await User.findOne({ email }).select("+password");
  
//     if (!user) {
//       return next(new ErrorHander("Invalid email or password", 401));
//     }
  
//     const isPasswordMatched = await user.comparePassword(password);
  
//     if (!isPasswordMatched) {
//       return next(new ErrorHander("Invalid email or password", 401));
//     }
  
//     sendToken(user, 200, res);
//   });
  
//   // Logout User
//   exports.logout = catchAsyncErrors(async (req, res, next) => {
//     res.cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//     });
  
//     res.status(200).json({
//       success: true,
//       message: "Logged Out",
//     });
// //   });
// import express from 'express';
// import { createRole } from '../controllers/roleController.js';
// import { ensureAdmin } from '../middleware/auth.js';  // Assuming you have an authentication middleware

// const router = express.Router();

// // Add middleware to check if the user is an admin
// router.post('/create-role', ensureAdmin, createRole);

// export default router;
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M5NjI0NDY5ZDRlYjk1OWExZDM1MTQiLCJpYXQiOjE3NDEyNTExNDAsImV4cCI6MTc0MTI1NDc0MH0.cEUqu_rjY-qXFkD3Ffl8X6qU9lGS57Z6RBeXuParFzE