import { NextRequest, NextResponse } from 'next/server';
import { fallbackResponse } from './fallback';
import { callOpenAIWithTools } from './openai';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, history } = body;

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
        }

        if (process.env.OPENAI_API_KEY) {
            return await callOpenAIWithTools(message, history || []);
        } else {
            return fallbackResponse(message);
        }
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
    }
}