export interface User {
  name: string;
  gender: 'boy' | 'girl';
  age: number;
  interests: string[];
  coins: number;
  streak: number;
  level: number;
}

export interface GameTask {
  dialogue: string;
  taskType: 'count' | 'find' | 'sort';
  targetItem: string;
  targetCount: number;
  options: string[];
  concept: string; // e.g., "Math", "Logic"
}

export type ScreenState = 'splash' | 'onboarding' | 'home' | 'game' | 'session_end' | 'phygital_lock';
