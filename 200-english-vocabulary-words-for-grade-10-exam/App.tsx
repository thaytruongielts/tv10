
import React, { useState, useCallback, useMemo } from 'react';
import { VocabularyWord } from './types';
import { vocabulary } from './data/vocabulary';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import VocabularyCard from './components/VocabularyCard';
import Navigation from './components/Navigation';
import QuizView from './components/QuizView';

type AppMode = 'learn' | 'quiz';

export default function App() {
  const [learnedWords, setLearnedWords] = useLocalStorage<string[]>('learnedWords', []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<AppMode>('learn');

  const currentWord = useMemo(() => vocabulary[currentIndex], [currentIndex]);

  const handleToggleLearned = useCallback((word: string) => {
    setLearnedWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  }, [setLearnedWords]);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, vocabulary.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  
  const handleStartQuiz = () => {
    setMode('quiz');
  };

  const handleExitQuiz = () => {
    setMode('learn');
  };

  const isCurrentWordLearned = useMemo(() => learnedWords.includes(currentWord.word), [learnedWords, currentWord]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 flex flex-col items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <Header mode={mode} onSetMode={setMode} />
        
        <main className="mt-6 animate-fade-in">
          <ProgressBar current={learnedWords.length} total={vocabulary.length} />

          {mode === 'learn' ? (
            <div className="mt-6">
              <VocabularyCard
                key={currentWord.word}
                wordData={currentWord}
                isLearned={isCurrentWordLearned}
                onToggleLearned={() => handleToggleLearned(currentWord.word)}
              />
              <Navigation
                onPrev={handlePrev}
                onNext={handleNext}
                currentIndex={currentIndex}
                total={vocabulary.length}
              />
            </div>
          ) : (
            <QuizView words={vocabulary} onExit={handleExitQuiz} />
          )}
        </main>
      </div>
    </div>
  );
}
