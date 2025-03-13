import express from 'express';
import {  createUser,getUserData, getAllUsers, updateUserByAuthId, deleteUser } from '../controllers/userController.js';
import { authenticateToken, isAdmin, isAuthorizedUser } from '../middelware/authmiddleware.js';


const router = express.Router();



router.post('/addUser',authenticateToken,isAdmin,createUser); // Only Admin can access this route
router.get('/users/:authId',authenticateToken,isAuthorizedUser, getUserData); // User but own id
router.get('/users',authenticateToken,isAdmin, getAllUsers); // Only Admin can access this route
router.put('/users/:authId',authenticateToken,isAuthorizedUser, updateUserByAuthId); // User but own id
router.delete('/users/:authId',authenticateToken,isAdmin, deleteUser); // Only Admin can access this route

export default router;
