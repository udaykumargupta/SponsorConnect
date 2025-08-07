import React, { useState, useEffect } from 'react';

// --- Helper Icons (as SVG components) ---
// Using inline SVGs means you don't need to install an icon library.
const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const SunIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
    </svg>
);

const MoonIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
);


// --- Main App Component ---
export default function App() {
  // 1. State to hold the current theme.
  // We initialize it by checking localStorage, defaulting to 'light'.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // 2. useEffect to apply the theme.
  // This runs whenever the `theme` state changes.
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element

    // Remove the old theme class and add the new one.
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Save the user's preference to localStorage.
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. Function to toggle the theme
  const handleChangeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // We apply a background color that respects the dark theme.
    <div className="min-h-screen w-full flex items-start justify-center p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-4xl">
        <header className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">My App</h1>
            {/* Search Bar */}
            <div className="relative flex items-center max-w-lg flex-grow ml-4">
              <input
                type="text"
                placeholder="Search"
                // Update classes to be theme-aware
                className="py-3 pl-12 pr-16 rounded-md w-full
                           text-gray-700 dark:text-gray-200
                           bg-gray-100 dark:bg-gray-700
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition-all duration-300 ease-in-out"
              />
              <div className="absolute left-0 top-0 flex items-center pl-4 h-full">
                {/* Update icon color */}
                <SearchIcon className="text-gray-500 dark:text-gray-400" />
              </div>
              <div
                className="absolute right-0 top-0 flex items-center pr-4 h-full cursor-pointer group"
                onClick={handleChangeTheme}
              >
                {/* 4. Conditionally render Sun or Moon icon */}
                {theme === 'light' ? (
                    <MoonIcon className="text-gray-700 group-hover:text-blue-500 transition-colors duration-300" />
                ) : (
                    <SunIcon className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                )}
              </div>
            </div>
        </header>

        {/* Example Content */}
        <main className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Welcome!</h2>
            <p className="text-gray-600 dark:text-gray-300">
                This is an example of a component that supports light and dark themes. Click the sun/moon icon to switch modes. Your preference will be saved for your next visit.
            </p>
        </main>
      </div>
    </div>
  );
}
