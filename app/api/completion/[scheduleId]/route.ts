// app/api/chat/[scheduleId]/route.ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    // Extract the last user message
    const lastUserMessage = messages
      .filter((msg: any) => msg.type === 'user')
      .pop()?.content || "Hello";
    
    // Get the schedule ID from the URL
    const scheduleId = req.nextUrl.pathname.split('/').pop();
    
    // Create a system prompt based on the schedule ID
    let systemPrompt = "You are a helpful assistant.";
    
    if (scheduleId === 'curriculum') {
      systemPrompt = "You are a Curriculum Schedule Master. You help with curriculum planning, course scheduling, and academic program development. Provide detailed, educational-focused responses.";
    } else if (scheduleId === 'siwes') {
      systemPrompt = "You are a SIWES (Student Industrial Work Experience Scheme) Schedule Master. You assist with industrial training programs, internship scheduling, and workplace learning coordination. Provide practical, industry-focused responses.";
    } else if (scheduleId === 'tna') {
      systemPrompt = "You are a Training Needs Analysis Schedule Master. You assist with all processes involved in training needs analysis. Provide practical, industry-focused responses.";
    } else if (scheduleId === 'msme') {
      systemPrompt = "You are a Micro Small and Medium Enterprise Schedule Master. You assist with industrial training programs, internship scheduling, and workplace learning coordination. Provide practical, industry-focused responses.";
    }
    
    const model = openai("gpt-4o");
    
    // Stream the response
    const result = streamText({
      model,
      system: systemPrompt,
      prompt: lastUserMessage,
      temperature: 0.7
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating text:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate text" }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}