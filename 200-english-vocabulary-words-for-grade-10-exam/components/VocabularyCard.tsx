
import React, { useState } from 'react';
import { VocabularyWord } from '../types';

interface VocabularyCardProps {
  wordData: VocabularyWord;
  isLearned: boolean;
  onToggleLearned: () => void;
}

const StarIcon: React.FC<{ isLearned: boolean }> = ({ isLearned }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-300 ${isLearned ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const VolumeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);


const VocabularyCard: React.FC<VocabularyCardProps> = ({ wordData, isLearned, onToggleLearned }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <div className="relative animate-slide-in-up" style={{ animationDelay: '200ms', perspective: '1000px' }}>
      <div
        className={`w-full transition-transform duration-500 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col justify-between min-h-[300px] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Front */}
        <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 py-1 px-2.5 rounded-full">{wordData.type}</span>
              <button onClick={onToggleLearned} className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <StarIcon isLearned={isLearned} />
              </button>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">{wordData.word}</h2>
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{wordData.pronunciation}</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button onClick={handleSpeak} className="p-3 bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <VolumeIcon />
            </button>
            <button onClick={() => setIsFlipped(true)} className="w-full sm:w-auto flex-grow sm:flex-grow-0 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Xem nghĩa
            </button>
          </div>
        </div>
        
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div>
                <div className="flex justify-end">
                    <button onClick={onToggleLearned} className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        <StarIcon isLearned={isLearned} />
                    </button>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">{wordData.meaning}</h3>
                    <div className="mt-4 text-left space-y-3">
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong className="font-semibold">Example:</strong> {wordData.example}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 italic">
                            {wordData.example_vn}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center">
                <button onClick={() => setIsFlipped(false)} className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-800 dark:text-slate-200 font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                    Ẩn nghĩa
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
