import { ChildBadge, UserAchievementsState } from '../types';

export const INITIAL_BADGES: ChildBadge[] = [
  {
    id: 'first_story',
    title: 'قارئ البدايات المباركة',
    description: 'أتممت قراءة أول قصة من قصص الأنبياء عليهم السلام',
    category: 'story',
    iconEmoji: '🌱',
    criteriaDescription: 'إتمام قراءة قصة واحدة',
    points: 20,
    level: 'bronze',
    targetCount: 1
  },
  {
    id: 'stories_trio',
    title: 'باحث في أنوار النبوة',
    description: 'أتممت قراءة ۳ قصص من قصص الأنبياء وتدبرت في دروسها',
    category: 'story',
    iconEmoji: '📜',
    criteriaDescription: 'إتمام قراءة ٣ قصص',
    points: 50,
    level: 'silver',
    targetCount: 3
  },
  {
    id: 'stories_master',
    title: 'حافظ السير الشريفة',
    description: 'قرأت ٦ قصص أو أكثر من قصص الأنبياء الموثقة',
    category: 'story',
    iconEmoji: '🌟',
    criteriaDescription: 'إتمام قراءة ٦ قصص',
    points: 100,
    level: 'gold',
    targetCount: 6
  },
  {
    id: 'all_prophets_read',
    title: 'حكيم سفراء الوحي',
    description: 'أتممت قراءة جميع قصص الأنبياء في المكتبة المباركة',
    category: 'story',
    iconEmoji: '👑',
    criteriaDescription: 'إتمام قراءة ٨ قصص كاملة',
    points: 200,
    level: 'diamond',
    targetCount: 8
  },
  {
    id: 'first_quiz_pass',
    title: 'متدبر متفطن',
    description: 'أجبت عن أول اختبار معرفي بنجاح وتفوق',
    category: 'quiz',
    iconEmoji: '🎯',
    criteriaDescription: 'إكمال اختبار قصة واحدة بنجاح',
    points: 25,
    level: 'bronze',
    targetCount: 1
  },
  {
    id: 'perfect_quiz',
    title: 'العالم الصغير الذكي',
    description: 'حققت العلامة الكاملة ۱۰۰٪ في اختبار قصة نبي',
    category: 'quiz',
    iconEmoji: '🏆',
    criteriaDescription: 'تحقيق العلامة الكاملة في أي اختبار',
    points: 60,
    level: 'gold',
    targetCount: 1
  },
  {
    id: 'quiz_master_three',
    title: 'فارس الاختبارات القرآنية',
    description: 'أتممت ۳ اختبارات بنجاح وثبتت معلوماتك المستمدة من الوحي',
    category: 'quiz',
    iconEmoji: '🏅',
    criteriaDescription: 'إكمال ٣ اختبارات معرفية',
    points: 80,
    level: 'silver',
    targetCount: 3
  },
  {
    id: 'quiz_grandmaster',
    title: 'بطل المعرفة والتوثيق',
    description: 'أتممت ٦ اختبارات لقصص الأنبياء بتفوق مستمر',
    category: 'quiz',
    iconEmoji: '💎',
    criteriaDescription: 'إكمال ٦ اختبارات معرفية',
    points: 150,
    level: 'diamond',
    targetCount: 6
  },
  {
    id: 'deep_explorer',
    title: 'باحث التوثيق والأسانيد',
    description: 'قمت بفحص الأدلة القرآنية والشواهد التوثيقية للقصة',
    category: 'explorer',
    iconEmoji: '🔎',
    criteriaDescription: 'الاطلاع على الشواهد والمصادر التوثيقية',
    points: 30,
    level: 'bronze',
    targetCount: 1
  },
  {
    id: 'three_days_streak',
    title: 'ملازم الذكر والهدى',
    description: 'تابعت القراءة لعدة أيام متواصلة بنشاط وعزيمة',
    category: 'streak',
    iconEmoji: '🔥',
    criteriaDescription: 'المواظبة على القراءة اليومية',
    points: 40,
    level: 'silver',
    targetCount: 3
  }
];

const STORAGE_KEY = 'prophet_stories_child_achievements_v1';

export function loadAchievementsState(): UserAchievementsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        completedStoryIds: Array.isArray(parsed.completedStoryIds) ? parsed.completedStoryIds : [],
        completedQuizScores: parsed.completedQuizScores || {},
        unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [],
        badgeUnlockDates: parsed.badgeUnlockDates || {},
        totalStars: typeof parsed.totalStars === 'number' ? parsed.totalStars : 0,
        readingStreakDays: typeof parsed.readingStreakDays === 'number' ? parsed.readingStreakDays : 1,
        lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0]
      };
    }
  } catch (e) {
    console.warn('Failed to load child achievements state', e);
  }

  return {
    completedStoryIds: [],
    completedQuizScores: {},
    unlockedBadgeIds: [],
    badgeUnlockDates: {},
    totalStars: 0,
    readingStreakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0]
  };
}

export function saveAchievementsState(state: UserAchievementsState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist child achievements', e);
  }
}

export interface AchievementEvaluationResult {
  newState: UserAchievementsState;
  newlyUnlockedBadges: ChildBadge[];
}

/**
 * Evaluates current user progress and unlocks badges if criteria are satisfied
 */
export function evaluateAchievements(
  currentState: UserAchievementsState,
  options?: {
    justCompletedStoryId?: string;
    justCompletedQuiz?: { prophetId: string; score: number; total: number };
    openedSourceVerification?: boolean;
  }
): AchievementEvaluationResult {
  const updatedState: UserAchievementsState = {
    ...currentState,
    completedStoryIds: [...currentState.completedStoryIds],
    completedQuizScores: { ...currentState.completedQuizScores },
    unlockedBadgeIds: [...currentState.unlockedBadgeIds],
    badgeUnlockDates: { ...currentState.badgeUnlockDates }
  };

  // 1. Process Story Completion
  if (options?.justCompletedStoryId && !updatedState.completedStoryIds.includes(options.justCompletedStoryId)) {
    updatedState.completedStoryIds.push(options.justCompletedStoryId);
  }

  // 2. Process Quiz Completion
  if (options?.justCompletedQuiz) {
    const { prophetId, score, total } = options.justCompletedQuiz;
    const existing = updatedState.completedQuizScores[prophetId];
    if (!existing || score > existing.score) {
      updatedState.completedQuizScores[prophetId] = {
        score,
        total,
        completedAt: new Date().toISOString()
      };
    }
  }

  // 3. Evaluate Badges
  const newlyUnlocked: ChildBadge[] = [];
  const nowStr = new Date().toISOString();

  const unlockBadge = (badgeId: string) => {
    if (!updatedState.unlockedBadgeIds.includes(badgeId)) {
      updatedState.unlockedBadgeIds.push(badgeId);
      updatedState.badgeUnlockDates[badgeId] = nowStr;
      const b = INITIAL_BADGES.find(x => x.id === badgeId);
      if (b) {
        newlyUnlocked.push({ ...b, unlockedAt: nowStr });
        updatedState.totalStars += b.points;
      }
    }
  };

  const storiesCount = updatedState.completedStoryIds.length;
  const quizzesCount = Object.keys(updatedState.completedQuizScores).length;
  const hasPerfectQuiz = Object.values(updatedState.completedQuizScores).some(q => q.score === q.total && q.total > 0);

  // Story badges
  if (storiesCount >= 1) unlockBadge('first_story');
  if (storiesCount >= 3) unlockBadge('stories_trio');
  if (storiesCount >= 6) unlockBadge('stories_master');
  if (storiesCount >= 8) unlockBadge('all_prophets_read');

  // Quiz badges
  if (quizzesCount >= 1) unlockBadge('first_quiz_pass');
  if (hasPerfectQuiz) unlockBadge('perfect_quiz');
  if (quizzesCount >= 3) unlockBadge('quiz_master_three');
  if (quizzesCount >= 6) unlockBadge('quiz_grandmaster');

  // Explorer badge
  if (options?.openedSourceVerification) {
    unlockBadge('deep_explorer');
  }

  // Recalculate total stars from scratch if needed to ensure consistency
  let calculatedStars = 0;
  INITIAL_BADGES.forEach(b => {
    if (updatedState.unlockedBadgeIds.includes(b.id)) {
      calculatedStars += b.points;
    }
  });
  // Add base points: +15 for each completed story, +10 for each quiz
  calculatedStars += storiesCount * 15;
  calculatedStars += Object.values(updatedState.completedQuizScores).reduce((acc, q) => acc + q.score * 5, 0);
  updatedState.totalStars = calculatedStars;

  saveAchievementsState(updatedState);

  return {
    newState: updatedState,
    newlyUnlockedBadges: newlyUnlocked
  };
}
