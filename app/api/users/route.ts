import User from "@/database/user.modules";
import handleError from "@/lib/handlers/errors";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/Types/global";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find();
        return NextResponse.json({success: true,data:users},{status:200});
        
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}
export async function POST(request:Request){
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData  = UserSchema.safeParse(body);
        if(!validatedData.success){
        throw new ValidationError(validatedData.error.flatten().fieldErrors);
        }
        const {email,username} = validatedData.data;
        const existingUser = await User.findOne({$or:[{email},{username}]});
        if(existingUser){
            throw new ValidationError({email:["Email or Username already exists"]});
        }
        const newUser = new User(validatedData.data);
        await newUser.save();
        return NextResponse.json({success:true,data:newUser},{status:201});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse 
        
    }
}