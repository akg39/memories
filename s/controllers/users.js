import bcrypt from 'bcryptjs';        //store the password in encrypted(hash) way so incase database got hacked even password will not reveal
import jwt from 'jsonwebtoken';       // for storing user info on browser

import User from "../models/user.js";
// import  mongoose  from 'mongoose';

export const signin = async(req,res) => {
  const {email, password} = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({message: "User doesn't exist!"});

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials!"});

    const token = jwt.sign({email:existingUser.email, id:existingUser._id}, 'test', {expiresIn:"1h"});   //'test' is a secret it should be hidden so we put it in .env file
    res.status(200).json({result:existingUser, token});

  } catch (error) {
    res.status(500).json({message:'Something Went Wrong!'});
  }
}


export const signup = async(req,res) => {
  const {email, password, confirmPassword, firstName, lastName} = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(existingUser)  return res.status(400).json({message: "User already exists!"});
    
    if(password !== confirmPassword)  return res.status(400).json({message: "Passwords don't match!"});

    const hashedpassword = await bcrypt.hash(password, 12);

    const result = await User.create({email, password: hashedpassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn:"1h" })

    res.status(200).json({result: result, token});

  } catch (error) {
    res.status(500).json({message:'Something Went Wrong!'});
  }
}