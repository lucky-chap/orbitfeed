import { NextRequest, NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { feedback } = await req.json();
  const google = createGoogleGenerativeAI({
    // custom settings
    apiKey: process.env.GEMINI_API_KEY,
  });

  console.log("From client: ", feedback);

  const { text } = await generateText({
    model: google("gemini-1.5-flash-latest"),
    prompt: `Generate sentiments & suggestions for improvement for this array of feedback: ${feedback}. Return the response as an html tree with no body, only with a div, and with nice styling using tailwindcss. Let the positive sentiments, the negative sentiments, and the suggestions be in their own divs.`,
  });

  const cleanedTexxt = text
    .replace(/```html\n/, "") // Remove the opening "```html\n"
    .replace(/\n```$/, "");

  return NextResponse.json({ text: cleanedTexxt });
}
