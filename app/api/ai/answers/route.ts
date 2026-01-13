import handleError from "@/lib/handlers/errors";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/Types/global";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, content, userAnswer } = await req.json();
  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content});
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a markdown-fomatted response to the following question: ${question}.Base it on the provided content:${content}
      also, prioritize and incorporate the user's asnwer when formating your responseP:**User's Answer:** ${userAnswer}
      Prioritize the user's answer only if it's correct. If it's incomplete or incorrect, improve or correct it while keeping the response concise and to the point. Provide the final asnwer in mardown format.,
      `,
      system:'...'
    });
    return NextResponse.json({ success: true, data: text }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}