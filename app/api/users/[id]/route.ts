import User from "@/database/user.modules";
import handleError from "@/lib/handlers/errors";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/Types/global";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const   id = (await params).id;
    if(!id) throw new NotFoundError("User ID is required");

    try {
        await dbConnect();
        const user = await User.findById(id);
        if(!user){
            throw new NotFoundError("User not found");
        }
        return NextResponse.json({success:true,data:user},{status:200});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const   id = (await params).id;
    if(!id) throw new NotFoundError("User ID is required");
    try {
        await dbConnect();
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            throw new NotFoundError("User not found");
        }
        return NextResponse.json({success:true,data:deletedUser},{status:200});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const   id = (await params).id;
    if(!id) throw new NotFoundError("User ID is required");
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData  = UserSchema.partial().safeParse(body);
        const updatedUser = await User.findByIdAndUpdate(id,validatedData.success ? validatedData.data : body,{new:true});
        if(!updatedUser){
            throw new NotFoundError("User not found");
        }
        return NextResponse.json({success:true,data:updatedUser},{status:200});
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }   
}