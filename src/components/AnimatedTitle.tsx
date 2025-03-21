import React from 'react';

interface AnimatedTitleProps {
  text: string;
  darkMode: boolean;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, darkMode }) => {
  return (
    <h1 className="text-3xl font-bold flex">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`
            inline-block
            transition-all
            duration-200
            hover:scale-125
            hover:-translate-y-1
            hover:cursor-default
            ${darkMode ? 
              'hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 
              'hover:text-indigo-600 hover:drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]'
            }
            ${char === ' ' ? 'w-[0.3em]' : ''}
          `}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};