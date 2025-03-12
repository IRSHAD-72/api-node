import User from '../models/userModel.js';

export const createUser= async (req, res) => {
 try {
       console.log("Recevived Data",req.body);
    const newUser = new User({
       name: req.body.name,
       cellphone1: req.body.cellphone1,
       cellphone2: req.body.cellphone2,
       homenumber: req.body.homenumber,
       address: req.body.address,
       city: req.body.city,
       state: req.body.state,
       emailid: req.body.emailid,
       jobTitle: req.body.jobTitle,
       paymentMethod: req.body.paymentMethod,
       dateOfBirth: req.body.dateOfBirth,
       dateOfJoining: req.body.dateOfJoining,
       languages: req.body.languages,
       ofPaidVacationDaysAllowed: req.body.ofPaidVacationDaysAllowed,
       ofPaidSickVacationAllowed: req.body.ofPaidSickVacationAllowed,
       employeeStatus: req.body.employeeStatus
     });

    
     const savedUser = await newUser.save();
     res.status(201).json({ message: "User added successfully!", user: savedUser });

   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Error saving user data", error });
   }
};


export const getUserById = async (req, res) => {
    try {
       const user = await User.findById(req.params.id); 
       if (!user) {
         return res.status(404).json({ message: "User not found" });
       }
       res.status(200).json(user);
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Error retrieving user data", error });
     }
  };
   

 export const getAllUsers = async (req, res) => {
     try {
         const users = await User.find();
       res.status(200).json(users);
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Error retrieving user data", error });
     }
  };
export const updateUser = async (req, res) => {
   const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json({ message: "User updated!", users: updateduser });
 };


export const deleteUser = async (req, res) => {
   await User.findByIdAndDelete(req.params.id);
   res.json({ message: "user deleted!" });
 };
 
