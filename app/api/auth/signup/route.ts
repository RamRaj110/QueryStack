import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { APIErrorResponse } from "@/Types/global";
import handleError from "@/lib/handlers/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, email, password } = body;

    const result = await signUpWithCredentials({
      name,
      username,
      email,
      password,
    });

    if (!result.success) {
      return new Response(JSON.stringify(result), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
