import Account from "@/database/account.modules";
import User from "@/database/user.modules";
import handleError from "@/lib/handlers/errors";
import { ForbiddenError,  } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountValidationSchema,  } from "@/lib/validation";
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
        const validatedData  = AccountValidationSchema.safeParse(body);
        const existingAccount = await Account.findOne({provider:validatedData.success ? validatedData.data.provider : body.provider,providerAccountId:validatedData.success ? validatedData.data.providerAccountId : body.providerAccountId});
        if(existingAccount){
            throw new ForbiddenError("Account already exists");
        }
        const newUser = new Account(validatedData.success ? validatedData.data : body);
        return NextResponse.json({success:true,data:newUser},{status:201});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse 
        
    }
}