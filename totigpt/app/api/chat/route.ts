import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

// Maximum response duration in seconds
export const maxDuration = 30;

// Initialize OpenAI client
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const { messages } = await req.json();

    // Use model as a string to avoid TypeScript errors
    const result = streamText({
      model: openai("gpt-4o-mini"), // pass model as a function call with string
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

