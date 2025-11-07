
import React from 'react';

type AppMode = 'learn' | 'quiz';

interface HeaderProps {
    mode: AppMode;
    onSetMode: (mode: AppMode) => void;
}

const Header: React.FC<HeaderProps> = ({ mode, onSetMode }) => {
    const tabClasses = (tabMode: AppMode) => 
        `px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-gray-900 focus:ring-indigo-500 ${
            mode === tabMode 
                ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
        }`;

    return (
        <header className="text-center animate-slide-in-up">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                200 Từ Vựng Tiếng Anh <span className="text-indigo-500">Lớp 10</span>
            </h1>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                Chinh phục kỳ thi tuyển sinh với vốn từ vựng vững chắc!
            </p>
            <div className="mt-8 flex justify-center bg-gray-200 dark:bg-gray-700 p-1 rounded-lg max-w-xs mx-auto">
                <button onClick={() => onSetMode('learn')} className={tabClasses('learn')}>
                    Học từ
                </button>
                <button onClick={() => onSetMode('quiz')} className={tabClasses('quiz')}>
                    Kiểm tra
                </button>
            </div>
        </header>
    );
};

export default Header;
