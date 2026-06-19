const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");    

const registerUser = async (req,res)=>{
    try {
        //fetch the Details 
    const {name,email,password} = req.body

    // Check if User Already Exists ?
    const existingUser = await User.findOne({email})
    // It Exits then
    if (existingUser) {
            return res.status(409).json({
                message:"Email Already Exists"
            })
        }
        
        //Hashing the password before saving
        const hashedPassword = await bcrypt.hash(password,10)
        //Create User in the DB
        const user = await User.create({
    name,email,password:hashedPassword
});
        return res.status(201).json({
            message:"SignUp Succesful"
        })
    } catch (error) {
        return res.status(500).json({
            message:"SignUp Failed",error:error.message
        })
    }
    }

const loginUser = async(req,res)=>{
    try {
        // Fetch user data
        const {email,password} = req.body
        //Check if it Exists or Not
        const user = await User.findOne({email})
        // If user does not exists
        if (!user) {
            return res.status(404).json({
                message:"Email/username Not Found",
            })
        }
        
        //Compare password
        const result = await bcrypt.compare(password,user.password)
        //Show Result
        if (!result) {
            return res.status(401).json({
                message:"Wrong Password"
            })
        }

        // Create Token and Return it 
        const token = jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET,{
            expiresIn:'7d'
        })

        return res.status(200).json({
                message:"Login Succesful",
                token,
                user:{
        _id:user._id,
        name:user.name,
        email:user.email,
    }
            })
            

    } catch (error) {
        return res.status(500).json({
            message:"Something Went Wrong",error:error.message
        })
    }
}


// const googleLogin = async (req,res)=>{
//     try {
//         // fetch google token and public key from the frontend
//         const { token: googleToken } = req.body
//         // Create Google Client
//         const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
//         // Create a Ticket from the client 
//         const ticket = await client.verifyIdToken({
//             idToken: googleToken,audience:process.env.GOOGLE_CLIENT_ID
//         })
//         // Create a Payload via the Ticket
//         const payload = ticket.getPayload()
//         //Pay load has all the Details of the User for usage
//         // User Exists
//         let user = await User.findOne({email: payload.email})

//         // User Does not Exists
//         if (!user) {
//             user = await User.create({
//                 name:payload.name,
//                 email:payload.email,
//                 googleId:payload.sub,
//             })
            
//         }
//         // Create Token and Return it 
//         const token = jwt.sign({
//             userId:user._id
//         },process.env.JWT_SECRET,{
//             expiresIn:'7d'
//         })
//         return res.status(200).json({
//     token,
//     user:{
//         _id:user._id,
//         name:user.name,
//         email:user.email,
//     }
// })
//     } catch (error) {
//         return res.status(500).json({
//             error:error.message
//         })
//     }
// }   


module.exports={
    registerUser,
    loginUser,
}
        