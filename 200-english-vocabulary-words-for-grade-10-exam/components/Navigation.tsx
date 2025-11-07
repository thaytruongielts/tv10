
import React from 'react';

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

const NavButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; className?: string }> = ({ onClick, disabled, children, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full sm:w-auto flex-1 sm:flex-initial flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const Navigation: React.FC<NavigationProps> = ({ onPrev, onNext, currentIndex, total }) => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
      <NavButton
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-gray-600 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Trước
      </NavButton>

      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {currentIndex + 1} / {total}
      </div>

      <NavButton
        onClick={onNext}
        disabled={currentIndex === total - 1}
        className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
      >
        Sau
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </NavButton>
    </div>
  );
};

export default Navigation;
