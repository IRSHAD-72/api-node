import jwt from 'jsonwebtoken';
import Auth from '../models/authModel.js';

// Middleware for authentication
export const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Access denied. User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  console.log("User object in isAdmin middleware:", req.user);  // Debugging log


  if (req.user && req.user.role === 'admin') {
    return next(); 
// Proceed to the next middleware or route handler
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};

// Middleware to check if the user is an employee
export const isEmployee = (req, res, next) => {
  console.log("User object in isEmployee middleware:", req.user);  // Debugging log
  
  if (req.user && (req.user.role === 'admin' || req.user.role === 'employee')) {
    return next(); // Proceed to the next middleware or route handler
  }
  return res.status(403).json({ message: 'Access denied. Employees only.' });
};

// Middleware to check if the user is a regular user
export const isUser = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'employee' || req.user.role === 'user')) {
    return next(); // Proceed to the next middleware or route handler
  }
  return res.status(403).json({ message: 'Access denied. Users only.' });
};
export const isAuthorizedUser = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user._id.toString() === req.params.id)) {
      return next();
  }
  return res.status(403).json({ message: "Access denied. You can only access your own data." });
};