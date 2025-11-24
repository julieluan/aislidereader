// Shared TypeScript types between frontend and backend

export type AccessibilityMode = 'ADHD' | 'Dyslexia' | 'General' | 'Hearing';

export type UserRole = 'teacher' | 'student';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  created_at: Date;
}

export interface Course {
  id: number;
  teacher_id: number;
  title: string;
  subject: string;
  accessibility_mode: AccessibilityMode;
  knowledge_text: string;
  agent_id?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface Outline {
  id: number;
  course_id: number;
  mermaid_diagram: string;
  items: OutlineItem[];
  created_at: Date;
}

export interface OutlineItem {
  id: string;
  title: string;
  type: 'core' | 'optional' | 'custom';
  description?: string;
  order: number;
}

export interface Slide {
  id: number;
  course_id: number;
  slide_order: number;
  title: string;
  concept: string;
  bullets: BulletPoint[];
  teacher_script: string;
  duration_seconds?: number;
}

export interface BulletPoint {
  id: string;
  text: string;
  order: number;
}

export interface Session {
  id: number;
  student_id: number;
  course_id: number;
  started_at: Date;
  ended_at?: Date;
  messages: Message[];
  current_slide: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  slide_id?: number;
}

export interface Progress {
  id: number;
  student_id: number;
  course_id: number;
  completed_slides: number;
  total_time_seconds: number;
  last_accessed: Date;
}

// API Request/Response types

export interface TranscribeRequest {
  audio: Blob;
}

export interface TranscribeResponse {
  text: string;
}

export interface GenerateOutlineRequest {
  knowledgeText: string;
  concepts: string[];
  accessibility: AccessibilityMode;
  keywords?: string[];
}

export interface GenerateOutlineResponse {
  mermaid: string;
  items: OutlineItem[];
}

export interface GenerateSlidesRequest {
  outline: OutlineItem[];
  accessibility: AccessibilityMode;
}

export interface GenerateSlidesResponse {
  slides: Omit<Slide, 'id' | 'course_id'>[];
}

export interface CreateAgentRequest {
  courseId: number;
  voiceId?: string;
}

export interface CreateAgentResponse {
  agentId: string;
}

export interface CourseAnalytics {
  totalStudents: number;
  avgCompletion: number;
  totalQuestions: number;
  avgSessionTime: number;
  commonQuestions: { question: string; count: number }[];
  slideEngagement: { slideId: number; avgTimeSpent: number }[];
}
