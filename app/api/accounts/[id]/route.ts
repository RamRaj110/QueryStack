import Account from "@/database/account.modules";
import User from "@/database/user.modules";
import handleError from "@/lib/handlers/errors";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountValidationSchema, UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/Types/global";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const   id = (await params).id;
    if(!id) throw new NotFoundError("Account");

    try {
        await dbConnect();
        const account = await Account.findById(id);
        if(!account){
            throw new NotFoundError("User not found");
        }
        return NextResponse.json({success:true,data:account},{status:200});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const   id = (await params).id;
    if(!id) throw new NotFoundError("Account");
    try {
        await dbConnect();
        const deletedUser = await Account.findByIdAndDelete(id);
        if(!deletedUser){
            throw new NotFoundError("Account");
        }
        return NextResponse.json({success:true,data:deletedUser},{status:200});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const   id = (await params).id;
    if(!id) throw new NotFoundError("Account");
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData  = AccountValidationSchema.partial().safeParse(body);
        if(!validatedData.success){
            throw new NotFoundError("Account");
        }
        const updatedUser = await Account.findByIdAndUpdate(id,validatedData.success ? validatedData.data : body,{new:true});
        if(!updatedUser){
            throw new NotFoundError("User not found");
        }
        return NextResponse.json({success:true,data:updatedUser},{status:200});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }   
}