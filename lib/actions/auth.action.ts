'use server'
import { ActionResponse, ErrorResponse } from "@/Types/global";
import action from "../handlers/action";
import handleError from "../handlers/errors";
import { SignInSchema, SignUpSchema } from "../validation";
import mongoose from "mongoose";
import User from "@/database/user.modules";
import Account from "@/database/account.modules";
import bcrypt from "bcryptjs";
import { NotFoundError } from "../http-errors";

export async function signUpWithCredentials(params:AuthCredentials):Promise<ActionResponse>{
    const validationResult = await action({params,schema:SignUpSchema as any})
    if(validationResult instanceof Error){
        return handleError(validationResult) as ErrorResponse;
    }
    if (!validationResult.params) {
        return { success: false, message: "Invalid parameters" };
    }
    const {name,username,email,password}= validationResult.params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const existingUser = await User.findOne({email}).session(session);
        if(existingUser){
            throw new Error("User already exists with this email");
        }
        const existingUsername = await User.findOne({username}).session(session);
        if(existingUsername){
            throw new Error("Username is already taken");
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const [newUser] = await User.create([{
            name,
            username,
            email,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
        }], {session}) as any;

        await Account.create([{
            userId:newUser._id,
            name,
            provider:'credentials',
            providerAccountId:email,
            password :hashedPassword,
        }], {session})
        await session.commitTransaction();
        return{success:true, message: "Account created successfully"}


    } catch (error) {
        await session.abortTransaction()
        return handleError(error) as ErrorResponse;
    }finally{
        await session.endSession();
    }

}


export async function signInWithCredentials(params:Pick<AuthCredentials , 'email'|'password'>):Promise<ActionResponse>{
    const validationResult = await action({params,schema:SignInSchema as any})
    if(validationResult instanceof Error){
        return handleError(validationResult) as ErrorResponse;
    }
    if (!validationResult.params) {
        return { success: false, message: "Invalid parameters" };
    }
    const {email,password}= validationResult.params!;
    try {

        const existingUser = await User.findOne({email})
        if(!existingUser){
            throw new NotFoundError('User')
        }
        const existingAccount= await Account.findOne({provider:'credentials',providerAccountId:email})
        if(!existingAccount){
            throw new NotFoundError("Account")
        }
        const passwordMatch= await bcrypt.compare(password,existingAccount.password)
        if(!passwordMatch) throw new Error("Password does not match")

        return{success:true, message: "Signed in successfully"}
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}