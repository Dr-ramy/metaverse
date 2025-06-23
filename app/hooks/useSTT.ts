"use client";

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export function useSTT() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = (lang: string = 'en-US') => {
    if (!browserSupportsSpeechRecognition) {
      console.error('🚫 STT not supported.');
      return;
    }
    SpeechRecognition.startListening({ continuous: false, language: lang });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const reset = () => {
    resetTranscript();
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    reset,
  };
}
