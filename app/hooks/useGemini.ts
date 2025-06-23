"use client";

import { useState } from 'react';
import axios from 'axios';

export function useGemini() {
  const [loading, setLoading] = useState(false);

  const askGemini = async (message: string): Promise<string> => {
    setLoading(true);
    try {
      const response = await axios.post('/api/gemini', { message });
      return response.data.response || "No response from Gemini.";
    } catch (err) {
      console.error("Gemini error:", err);
      return "Error connecting to AI.";
    } finally {
      setLoading(false);
    }
  };

  return { askGemini, loading };
}
