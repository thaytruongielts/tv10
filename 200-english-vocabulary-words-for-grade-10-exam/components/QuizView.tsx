
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { VocabularyWord } from '../types';

interface QuizQuestion {
  word: string;
  correctAnswer: string;
  options: string[];
}

interface QuizViewProps {
  words: VocabularyWord[];
  onExit: () => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuizView: React.FC<QuizViewProps> = ({ words, onExit }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const generateQuestions = useCallback(() => {
    const shuffledWords = shuffleArray(words);
    // Fix: Explicitly type wordData to avoid implicit any/unknown type
    const quizQuestions = shuffledWords.slice(0, 10).map((wordData: VocabularyWord) => {
      const correctAnswer = wordData.meaning;
      let incorrectOptions = words
        .filter(w => w.meaning !== correctAnswer)
        .map(w => w.meaning);
      
      incorrectOptions = shuffleArray(incorrectOptions).slice(0, 3);
      
      return {
        word: wordData.word,
        correctAnswer: correctAnswer,
        options: shuffleArray([correctAnswer, ...incorrectOptions])
      };
    });
    setQuestions(quizQuestions);
  }, [words]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const hasAnswered = selectedAnswer !== null;

  const handleAnswerClick = (answer: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleRestart = () => {
      setIsFinished(false);
      setScore(0);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      generateQuestions();
  };

  const getButtonClass = (option: string) => {
    if (!hasAnswered) {
      return 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-500 text-white';
    }
    if (option === selectedAnswer) {
      return 'bg-red-500 text-white';
    }
    return 'bg-white dark:bg-gray-700 opacity-60';
  };

  if (questions.length === 0) {
    return <div className="text-center p-8">Đang tải câu hỏi...</div>;
  }

  if (isFinished) {
      return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center animate-fade-in">
              <h2 className="text-2xl font-bold">Hoàn thành!</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Điểm của bạn: <span className="font-bold text-indigo-500 text-xl">{score} / {questions.length}</span>
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={handleRestart} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                      Làm lại
                  </button>
                  <button onClick={onExit} className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-slate-800 dark:text-slate-200 font-bold py-3 px-6 rounded-lg transition-colors">
                      Quay lại học
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Câu hỏi {currentQuestionIndex + 1}/{questions.length}</h2>
            <div className="text-lg font-semibold text-indigo-500">Điểm: {score}</div>
        </div>
      
        <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400">Nghĩa của từ <strong className="text-3xl font-bold text-slate-800 dark:text-slate-100 mx-2">{currentQuestion.word}</strong> là gì?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
            <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 text-slate-800 dark:text-slate-200 ${getButtonClass(option)} ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {option}
            </button>
            ))}
        </div>
        
        {hasAnswered && (
            <div className="mt-8 text-center animate-fade-in">
                <button
                onClick={handleNextQuestion}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                </button>
            </div>
        )}
    </div>
  );
};

export default QuizView;
