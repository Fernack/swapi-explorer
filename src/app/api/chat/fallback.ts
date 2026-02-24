import { NextResponse } from 'next/server';

export function fallbackResponse(message: string) {
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('luke') || lower.includes('skywalker')) {
        reply = `Luke Skywalker, the hero from Tatooine!`;
    } else if (lower.includes('vader') || lower.includes('anakin')) {
        reply = `Darth Vader, the Dark Lord of the Sith.`;
    } else if (lower.includes('tatooine')) {
        reply = `Tatooine, a desert planet with twin suns.`;
    } else if (lower.includes('millennium falcon') || lower.includes('falcon')) {
        reply = `The Millennium Falcon, piloted by Han Solo and Chewbacca!`;
    } else if (lower.includes('force')) {
        reply = `The Force is an energy field connecting all living things in the galaxy.`;
    } else {
        reply = `I am C-3PO! I can answer Star Wars questions if you set OPENAI_API_KEY.`;
    }

    return NextResponse.json({
        reply,
        model: 'fallback',
        notice:
            'No LLM API key configured. Using rule-based responses. Set OPENAI_API_KEY in .env.local for full AI capabilities.',
    });
}