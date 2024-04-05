import express from 'express'
import { createUser, loginUser, 
    logoutUser, getAllUsers,
    getCurrentUserProfile, updateOwnProfile,
    deleteUserById, getUserById,
    updateUserById } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router()

// router.route('/').post(createUser)
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logoutUser)
router.post('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateOwnProfile)
// admin routes
router.route('/:id').delete(authenticate, authorizeAdmin, deleteUserById).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById)

export default router;
