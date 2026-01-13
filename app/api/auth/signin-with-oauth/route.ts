import mongoose from "mongoose";
import dbConnect from "@/lib/mongoose";
import handleError from "@/lib/handlers/errors";
import { APIErrorResponse } from "@/Types/global";
import { SignInOAuthSchema } from "@/lib/validation";
import { ValidationError } from "@/lib/http-errors";
import slugify from "slugify";
import User from "@/database/user.modules";
import Account from "@/database/account.modules";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const validatedData = SignInOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, username, email, image } = user;
    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });
    let existingUser = await User.findOne({ email }).session(session);
    if (!existingUser) {
      const [newUser] = await User.create(
        [
          {
            name,
            username: slugifiedUsername,
            email,
            image: image || "https://via.placeholder.com/150",
          },
        ],
        { session }
      );
      existingUser = newUser;
    } else {
      const updatedData: Partial<typeof user> = {};
      if (existingUser.name !== name) updatedData.name = name;
      if (existingUser.image !== (image || existingUser.image))
        updatedData.image = image || existingUser.image;
      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { id: existingUser._id },
          { $set: updatedData }
        ).session(session);
      }
    }
    const existingAccount = await Account.findOne({
      userId: existingUser.id,
      provider,
      providerAccountId,
    }).session(session);
    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser.id,
            provider,
            providerAccountId,
            name: provider,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();
    return new Response(
      JSON.stringify({ success: true, message: "Sign-in successful" }),
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    return handleError(error, "api") as APIErrorResponse;
  } finally {
    session.endSession();
  }
}
