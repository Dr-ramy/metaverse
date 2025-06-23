'use client';

import React, { useEffect, useState } from 'react';
import { npcFAQs, FAQEntry, NPCData } from '@/app/hooks/npcDialogues';
import DialogueSystem from '@/app/components/npc/DialogueSystem';
import { useSTT } from '@/app/hooks/useSTT';
import { useSpeech } from '@/app/hooks/useSpeech';
import { useGemini } from '@/app/hooks/useGemini';

interface DialogueHandlerProps {
  npcName: string | null;
  onClose?: () => void;
}

export default function DialogueHandler({ npcName, onClose }: DialogueHandlerProps) {
  const [dialogueNode, setDialogueNode] = useState<{ message: string } | null>(null);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);

  const {
    transcript,
    startListening,
    stopListening,
    listening,
    reset,
  } = useSTT();

  const { speak, stop } = useSpeech();
  const { askGemini } = useGemini();

  // Show greeting when NPC changes
  useEffect(() => {
    if (!npcName) return;

    const npcData: NPCData | undefined = npcFAQs[npcName];
    if (!npcData) {
      handleGeminiStart('Hello');
      return;
    }

    setDialogueNode({ message: npcData.greeting });
    speak(npcData.greeting, npcName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [npcName]);

  // When user finishes speaking
  useEffect(() => {
    if (transcript) {
      handlePlayerMessage(transcript);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  const handlePlayerMessage = async (message: string) => {
    if (!npcName) return;

    const npcData: NPCData | undefined = npcFAQs[npcName];
    const faqs: FAQEntry[] = npcData?.faqs || [];
    const normalizedMsg = message.toLowerCase().trim();

    // Full-match
    let matched = faqs.find(
      (faq) => normalizedMsg === faq.question.toLowerCase().trim()
    );

    // Partial-match via keywords
    if (!matched) {
      matched = faqs.find((faq) =>
        faq.keywords?.some((keyword) => normalizedMsg.includes(keyword))
      );
    }

    if (matched) {
      speak(matched.answer, npcName);
      setDialogueNode({ message: matched.answer });
      return;
    }

    // Fallback to Gemini
    handleGeminiStart(message);
  };

  const handleGeminiStart = async (prompt: string) => {
    setDialogueNode({ message: 'Thinking...' });

    const context = conversationHistory.join('\n');
    const fullPrompt = `
You are a helpful NPC in a video game. Keep responses short (1–2 sentences max).
Keep the conversation natural and connected to the previous context.

Context:
${context}

Player: ${prompt}
NPC:
    `.trim();

    const reply = await askGemini(fullPrompt);
    speak(reply, npcName);
    setDialogueNode({ message: reply });

    setConversationHistory((prev) => [
      ...prev,
      `Player: ${prompt}`,
      `NPC: ${reply}`,
    ]);
  };

  const closeDialogue = () => {
    setDialogueNode(null);
    stop();
    reset();
    stopListening();

    if (onClose) {
      onClose(); // ✅ تم استدعاء الدالة بشكل صحيح
    }
  };

  return (
    <>
      {dialogueNode && (
        <DialogueSystem
          dialogue={{
            message: dialogueNode.message,
            options: ['Close'],
          }}
          onSubmit={handlePlayerMessage}
          onOptionClick={closeDialogue}
          onClose={closeDialogue}
          onStartListening={() => {
            listening ? stopListening() : startListening();
          }}
          listening={listening}
        />
      )}
    </>
  );
}
