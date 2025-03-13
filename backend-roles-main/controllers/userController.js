
import User from '../models/userModel.js';
import mongoose from 'mongoose';  

export const createUser= async (req, res) => {
 try {
       console.log("Recevived Data",req.body);
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),     
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        cellphone1: req.body.cellphone1,
        cellphone2: req.body.cellphone2,
        homenumber: req.body.homenumber,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        jobTitle: req.body.jobTitle,
        paymentMethod: req.body.paymentMethod,
        dateOfBirth: req.body.dateOfBirth,
        dateOfJoining: req.body.dateOfJoining,
        languages: req.body.languages,
        authId: req.body.authId
    
  
     });

    
     const savedUser = await newUser.save();
     res.status(201).json({ message: "User added successfully!", user: savedUser });

   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Error saving user data", error });
   }
};





export const getUserData = async (req, res) => {
  try {
    // Find the user by authId (from the authenticated user)
    const user = await User.findOne({ authId: req.user._id }).populate('authId', 'email role');
      console.log("User found:", user);   
      
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User data retrieved successfully', user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: 'Error fetching user data.', error });
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

  export const updateUserByAuthId = async (req, res) => {
    try {
      const { authId } = req.params; // Get authId from URL params
      const updates = req.body; // Get update data from request body
  
      // ✅ Find and update the user by authId
      const updatedUser = await User.findOneAndUpdate(
        { authId },  // Find user by authId
        updates,     // Apply updates
        { new: true, runValidators: true } // Return updated user & validate
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ message: "User updated successfully!", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user details.", error });
    }
  };
  


export const deleteUser = async (req, res) => {
   await User.findByIdAndDelete(req.params.id);
   res.json({ message: "user deleted!" });
 };
 
