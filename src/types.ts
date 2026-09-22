export type AgeGroup = '5-7' | '8-10' | '11-13';

export type StoryStatus = 'verified' | 'under_review' | 'draft' | 'needs_correction';

export interface SourceReference {
  id: string;
  title: string;
  type: 'quran' | 'hadith' | 'tafsir' | 'scholarly_reference';
  referenceDetails: string;
  textSnippet?: string;
  authenticityDegree?: string;
}

export interface QuranicVerse {
  surah: string;
  ayahNumber: string;
  text: string;
  explanation?: string;
}

export interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  symbolicIllustration: {
    theme: 'garden' | 'ark' | 'mountain' | 'stars' | 'desert' | 'water' | 'nature';
    caption: string;
    symbolicNotice: string;
  };
  associatedAyah?: QuranicVerse;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DidYouKnowFact {
  id: string;
  fact: string;
  source: string;
  verified: boolean;
}

export interface CautionItem {
  id: string;
  topic: string;
  whatIsAuthentic: string;
  whatIsDifferedOrUnproven: string;
  guidance: string;
}

export interface QuizQuestion {
  id: string;
  ageGroup: 'all' | '5-7' | '8-10' | '11-13';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceReference: string;
}

export interface ParentDiscussionGuide {
  suitableAgeAdvice: string;
  educationalGoals: string[];
  discussionPrompts: string[];
  familyActivity: string;
}

export interface AccuracyVerification {
  allInfoSourced: boolean;
  noFabricatedDetails: boolean;
  noWeakHadithAsFact: boolean;
  separatedQuranFromTafsir: boolean;
  noSymbolicDepictionOfProphetsBody: boolean;
  ageAppropriateLanguage: boolean;
  verifierName: string;
  verificationDate: string;
  notes?: string;
}

export interface ReviewChecklist {
  quranicVersesChecked: boolean;
  hadithReferencedAndAuthentic: boolean;
  noProphetDepiction: boolean;
  israiliyatExcluded: boolean;
  ageAppropriateLanguage: boolean;
  quizQuestionsReviewed: boolean;
  sourcesExplicitlyStated: boolean;
  coreValuesClarified: boolean;
  audioScriptMatchesText: boolean;
}

export interface DifficultWord {
  id: string;
  word: string;
  meaning: string;
  pronunciationHint?: string; // e.g. phonetic or specific text for TTS if needed
}

export interface ProphetStory {
  id: string;
  name: string;
  title: string;
  epithet: string; // e.g. "أبو البشر" or "شيخ المرسلين" or "كليم الله"
  shortSummary: string;
  symbolicTheme: 'garden' | 'ark' | 'mountain' | 'stars' | 'desert' | 'water' | 'nature';
  quranicMentionsCount: number;
  historicalPeriod: string;
  status: StoryStatus;
  reviewChecklist: ReviewChecklist;
  
  // Variations for each age tier
  ageVariants: Record<AgeGroup, {
    summary: string;
    chapters: StoryChapter[];
  }>;

  coreValues: CoreValue[];
  didYouKnow: DidYouKnowFact[];
  vocabulary?: DifficultWord[];
  cautionsAndDiscrepancies: CautionItem[];
  sources: SourceReference[];
  quiz: QuizQuestion[];
  audioScript: {
    fullText: string;
    estimatedMinutes: number;
  };
  parentGuide: ParentDiscussionGuide;
  accuracyCheck: AccuracyVerification;
  reflectionQuestion?: string; // التفكير في مغزى القصة
}

export type AchievementCategory = 'story' | 'quiz' | 'explorer' | 'reflection' | 'streak';

export interface ChildBadge {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  iconEmoji: string;
  iconName?: string;
  criteriaDescription: string;
  unlockedAt?: string; // ISO date string if unlocked
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
  targetCount: number;
  currentCount?: number;
}

export interface UserAchievementsState {
  completedStoryIds: string[]; // List of prophet IDs where reading is completed
  completedQuizScores: Record<string, { score: number; total: number; completedAt: string }>; // prophetId -> score
  unlockedBadgeIds: string[]; // list of unlocked badge IDs
  badgeUnlockDates: Record<string, string>; // badgeId -> timestamp
  totalStars: number; // accumulated stars / points
  readingStreakDays: number;
  lastActiveDate: string;
}
