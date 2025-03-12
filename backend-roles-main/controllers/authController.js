import Auth from '../models/authModel.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  console.log("email received", email);
  console.log(req.body);

  try {
    // Check if email already exists
    const existingAuth = await Auth.findOne({ email });
    if (existingAuth) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Restrict admin role: Only one admin allowed
    if (role === 'admin') {
      const existingAdmin = await Auth.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(403).json({ message: 'Admin already exists. Cannot create another admin.' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with provided role, default to 'user' if not specified
    const newAuth = new Auth({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || 'user', // If no role is provided, default to 'user'
    });

    await newAuth.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newAuth._id, role: newAuth.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newAuth._id, email: newAuth.email, role: newAuth.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await Auth.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Log the entered password and stored hashed password
    console.log("Entered password: ", password);
    console.log("Stored hashed password: ", user.password);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    
    
    
    
    // Call comparePassword on the user instance
    console.log("Password match result: ", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log("User found:", user);
    // Create a JWT token with user ID and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return success response with token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// export const profile = async (req, res) => {
//   try {
//     const user = await Auth.findById(req.user.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User profile data', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving user data', error });
//   }
// };

// export const assignRoles = async (req, res) => {
//   const { userId, roleIds } = req.body;  // roleIds is an array of role ObjectIds

//   // Validate input data
//   if (!userId || !roleIds || !Array.isArray(roleIds)) {
//     return res.status(400).json({ message: 'User ID and role IDs are required' });
//   }

//   try {
//     // Find the user by userId
//     const user = await Auth.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find the roles by their IDs
//     const roles = await Auth.find({ '_id': { $in: roleIds } });
//     if (roles.length !== roleIds.length) {
//       return res.status(400).json({ message: 'One or more roles not found' });
//     }

//     // Assign the roles to the user
//     user.roles = roles;

//     // Save the updated user document
//     await user.save();

//     return res.status(200).json({ message: 'Roles assigned successfully', user });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Error assigning roles' });
//   }
// };