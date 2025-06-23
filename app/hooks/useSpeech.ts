"use client";

import { useRef } from 'react';

export function useSpeech() {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getFemaleVoice = () => {
    const voices = synth?.getVoices() || [];
    return (
      voices.find((v) =>
        v.lang === 'en-US' &&
        (
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('samantha') ||
          v.name.toLowerCase().includes('google us english') ||
          v.name.toLowerCase().includes('joanna') ||
          v.name.toLowerCase().includes('emma') ||
          v.name.toLowerCase().includes('linda')
        )
      ) || voices.find((v) => v.lang === 'en-US') || voices[0]
    );
  };

  const getVoiceForNpc = (npcName?: string | null) => {
    if (!synth) return null;

    const voices = synth.getVoices();
    if (npcName === 'wpc3' || npcName === 'wpc2' || npcName === 'prof1') {
      return getFemaleVoice();
    }
    return voices.find((v) => v.lang === 'en-US') || voices[0];
  };

  const speak = (text: string, npcName?: string | null) => {
    if (!synth) return;

    if (
      synth.speaking &&
      utteranceRef.current &&
      utteranceRef.current.text === text
    ) {
      //console.log('[Speech] النص نفسه يُتحدث الآن، لا حاجة للإعادة');
      return;
    }

    if (synth.speaking) {
    //  console.log('[Speech] تم إلغاء النطق السابق');
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // ✅ اختيار الصوت حسب الـ NPC
    const voice = getVoiceForNpc(npcName);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
    //  console.log(`[Speech] 🗣 بدأ التحدث (${npcName}): "${text}"`);
    };

    utterance.onend = () => {
     // console.log('[Speech] ✅ انتهى التحدث');
      utteranceRef.current = null;
    };

    utterance.onerror = (e) => {
      if (e.error === 'interrupted') {
    //    console.warn('[Speech] ⚠️ تم إيقاف التحدث (interrupted)');
        return;
      }
 //     console.error('[Speech] ❌ خطأ في النطق:', e.error);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const stop = () => {
    synth?.cancel();
    utteranceRef.current = null;
  };

  return { speak, stop };
}
