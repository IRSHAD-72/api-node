import express from 'express';
import { authenticateToken, isAdmin, isEmployee, isUser } from '../middelware/authmiddleware.js';

const router = express.Router();

router.get('/admin-dashboard',authenticateToken,isAdmin, (req, res) => {
  // Admin only route
  res.status(200).json({ message: 'Admin Dashboard' });
});

router.get('/employee-dashboard', authenticateToken, isEmployee, (req, res) => {
  // Employee or Admin can access this route
  res.status(200).json({ message: 'Employee Dashboard' });
});

router.get('/user-page',authenticateToken, isUser, (req, res) => {
  // All users, employees, and admins can access this route
  res.status(200).json({ message: 'User Page' });
});

export default router;