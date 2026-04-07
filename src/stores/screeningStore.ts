import { create } from 'zustand';
import type { ScreeningStatus, ChatMessage } from '@/data/mockData';

interface ScreeningState {
  status: ScreeningStatus;
  progress: number;
  biasWarning: string | null;
  biasWarningDismissed: boolean;
  chatMessages: ChatMessage[];
  isStreaming: boolean;
  isUnlocked: boolean;
  setStatus: (s: ScreeningStatus) => void;
  setProgress: (p: number) => void;
  dismissBiasWarning: () => void;
  addChatMessage: (msg: ChatMessage) => void;
  setChatMessages: (msgs: ChatMessage[]) => void;
  setIsStreaming: (s: boolean) => void;
  setIsUnlocked: (u: boolean) => void;
  resetScreening: () => void;
}

export const useScreeningStore = create<ScreeningState>((set) => ({
  status: 'idle',
  progress: 0,
  biasWarning: null,
  biasWarningDismissed: false,
  chatMessages: [],
  isStreaming: false,
  isUnlocked: false,
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  dismissBiasWarning: () => set({ biasWarningDismissed: true }),
  addChatMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  setChatMessages: (chatMessages) => set({ chatMessages }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setIsUnlocked: (isUnlocked) => set({ isUnlocked }),
  resetScreening: () => set({
    status: 'idle', progress: 0, biasWarning: null,
    biasWarningDismissed: false, chatMessages: [], isStreaming: false, isUnlocked: false,
  }),
}));
