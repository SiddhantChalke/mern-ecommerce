import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error('Please fill all the details.');
    }
    // if email already exists...user exists
    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send('User already exists');

    // password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // creating new user
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save();

        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });

    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


// Logging in the user
const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    // if existing User...check entered p/w with existing p/w
    if(existingUser){
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if(isValidPassword){
            // if valid ...create token & set the res to cookies
            createToken(res, existingUser._id);

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
            return;
        }
    }
});

// logging out the user
const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({message: "loged out successfully"})
});

// Getting all users
const getAllUsers = asyncHandler(async (req, res)=>{
    const users = await User.find({})
    res.json(users);

});

// Getting a particular user
const getCurrentUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else{
        res.status(404)
        throw new Error("User not found");
    }
})

// Updating user's own profile
const updateOwnProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id);
    // if requested user is found in db
    if(user){
        // set details to new one's or keep og details unharmed
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if(req.body.password){
            // password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // set
            user.password = hashedPassword;
        }
        // save user details
        const updatedUser = await user.save();
        // show the newly updated details to user
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else{    
        res.status(404)
        throw new Error("User not found");
    }
});
// to delete one of the users
const deleteUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error("Cannot delete admin user.");
        }
        await User.deleteOne({ _id: user._id });
        res.json({message: "User removed."});

    } else{
        res.status(404);
        throw new Error("User not found.");
    }
});

// to get a user
const getUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user);
    } else{
        res.status(404);
        throw new Error("User not found.")
    }
});

// update a user's profile By id
const updateUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin)
        
        const updatedUser = await user.save;
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });


    } else{
        res.status(404);
        throw new Error("User not found.")
    }
});

export {createUser, 
    loginUser,
    logoutUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateOwnProfile,
    deleteUserById,
    getUserById,
    updateUserById
};