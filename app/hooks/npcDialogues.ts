"use client";
/*
export interface DialogueOption {
  text: string;
  end?: boolean;
}
  */
 
export interface DialogueNode {
  message: string;
  options?: string[];
}

export interface FAQEntry {
  question: string;
  answer: string;
  keywords?: string[];
}

export interface NPCData {
  greeting: string;
  faqs: FAQEntry[];
  voice?: 'female' | 'male'; // Added to specify voice gender
}

// Renamed from npcDialogues to npcFAQs and exported correctly
export const npcFAQs: Record<string, NPCData> = {
  npc1: {
    greeting: "Hello Wesmaa, how can I help you today?",
    faqs: [
      {
        question: "Where is Egypt?",
        answer: "It is in Africa.",
        keywords: ["Where is Egypt"]
      },
      {
        question: "What is the color of the sky?",
        answer: "It is blue.",
        keywords: ["sky", "color", "blue"]
      },
      {
        question: "Who are you?",
        answer: "I'm your helpful guide.",
        keywords: ["who", "are", "you"]
      }
    ],
    voice: 'male'
  },
  npc3: {
    greeting: "Hello Taha and Samir, nice to see you!",
    faqs: [
      {
        question: "How old are you?",
        answer: "I don't age. I'm just code!",
        keywords: ["how", "old", "age"]
      },
      {
        question: "Where can I find water?",
        answer: "Follow the path to the river.",
        keywords: ["water", "find", "where"]
      }
    ],
    voice: 'female'
  },
  npc5: {
    greeting: "Welcome to the lab! How can I help you?",
    faqs: [
      {
        question: "What's your role?",
        answer: "I'm a virtual lab assistant.",
        keywords: ["role", "assistant"]
      }
    ],
    voice: 'female'
  }
};
