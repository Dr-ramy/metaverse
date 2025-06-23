

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body.message;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is missing from environment variables' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ response: reply || "No reply from Gemini." });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Gemini API error:', error.response?.data || error.message);
      return NextResponse.json(
        {
          error: 'Error connecting to Gemini',
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      console.error('❌ Unknown error:', error.message);
      return NextResponse.json(
        {
          error: 'Unknown error',
          details: error.message,
        },
        { status: 500 }
      );
    } else {
      console.error('❌ Unexpected error:', error);
      return NextResponse.json(
        {
          error: 'Unexpected error',
          details: String(error),
        },
        { status: 500 }
      );
    }
  }
}
