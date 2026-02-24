import OpenAI from "openai";
import { NextResponse } from "next/server";
import { searchSwapi } from "./searchSwapi";
import { SYSTEM_PROMPT } from "./systemPrompt";

export async function callOpenAIWithTools(
  message: string,
  history: { role: "user" | "assistant" | "system"; content: string }[]
) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "search_swapi",
            description: "Search Star Wars entities (people, planets, films, species, vehicles, starships).",
            parameters: {
              type: "object",
              properties: {
                resource: { type: "string" },
                query: { type: "string" },
              },
              required: ["resource", "query"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    const msg = completion.choices[0].message;

    if (!msg.tool_calls || msg.tool_calls.length === 0) {
      return NextResponse.json({
        reply: msg.content || "No response from AI",
        model: "gpt-4o-mini",
      });
    }

    const toolCall = msg.tool_calls[0];
    if (toolCall.type !== "function" || !toolCall.function?.arguments) {
      return NextResponse.json({
        reply: "Tool call invalid",
        model: "fallback",
      });
    }

    let args: { resource: string; query: string };
    try {
      args = JSON.parse(toolCall.function.arguments);
    } catch {
      return NextResponse.json({
        reply: "Invalid tool arguments",
        model: "fallback",
      });
    }

    const toolResult = await searchSwapi(args.resource, args.query);
    if (!toolResult) {
      return NextResponse.json({
        reply: `No data found for ${args.resource} "${args.query}"`,
        model: "fallback",
      });
    }

    const finalResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
        msg,
        {
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        },
      ],
    });

    return NextResponse.json({
      reply: finalResponse.choices[0].message?.content || "No response from AI",
      model: "gpt-4o-mini",
    });
  } catch (err: any) {
    console.error("callOpenAIWithTools error:", err);
    return NextResponse.json(
      { reply: err.message || "Internal server error", model: "fallback" },
      { status: 500 }
    );
  }
}