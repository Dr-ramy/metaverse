declare module 'react-speech-recognition' {
  // ✅ لا حاجة لـ ReactNode، تم حذفه

  export interface Command {
    command: string | string[];
    callback: (...args: string[]) => void;
    matchInterim?: boolean;
    isFuzzyMatch?: boolean;
    fuzzyMatchingThreshold?: number;
    bestMatchOnly?: boolean;
  }

  export interface UseSpeechRecognitionOptions {
    commands?: Command[];
  }

  export interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
  }

  export interface SpeechRecognition {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  }

  export function useSpeechRecognition(
    options?: UseSpeechRecognitionOptions
  ): SpeechRecognition;

  export function startListening(options?: {
    continuous?: boolean;
    language?: string;
  }): void;

  export function stopListening(): void;
  export function abortListening(): void;

  // ✅ تم تخصيص كائن للتصدير الافتراضي بدلاً من anonymous object
  const speechRecognitionExports: {
    startListening: typeof startListening;
    stopListening: typeof stopListening;
    abortListening: typeof abortListening;
  };

  export default speechRecognitionExports;
}
