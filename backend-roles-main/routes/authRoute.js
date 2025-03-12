import express from 'express';
import { signup, login } from '../controllers/authcontroller.js';

const router = express.Router();


router.post('/signup', signup);


router.post('/login', login);


//router.get('/profile', authenticateToken, profile);

// routes/authRoutes.js


// Route to assign roles to a user
//router.put('/assign-roles',assignRoles);



export default router;
