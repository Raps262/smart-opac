// src/components/NavBar/ActionButton.jsx
import { useState } from "react";

export const ActionButton = ({
  icon: Icon,
  label,
  children,
  onClick,
  active = false,
  tooltipText = null,
  className = "",
  variant = "dark", // light = hero | dark = scrolled
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Menentukan mode hero
  const isLight = variant === "light";

  const handleClick = () => {
    onClick && onClick();

    if (tooltipText) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1500);
    }
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={handleClick}
        className={`
          group flex items-center gap-1 px-5 py-1.5 rounded-full text-sm font-semibold
          transition-all duration-300 ease-in-out
          
          ${
            isLight
              // MODE HERO: benar-benar bersih
              ? active
                ? "text-white underline underline-offset-4"
                : "text-white hover:opacity-80"
              // MODE SCROLL: behavior lama
              : active
                ? "bg-white text-indigo-600 border border-slate-300 shadow-sm"
                : "border border-transparent text-slate-600 hover:text-indigo-600 hover:bg-slate-200/60"
          }

          ${className}
        `}
      >
        {Icon && (
          <Icon
            size={16}
            className={`
              transition-colors duration-300
              ${
                isLight
                  ? "text-white"
                  : active
                    ? "text-indigo-600"
                    : "text-slate-500 group-hover:text-indigo-600"
              }
            `}
          />
        )}
        {label || children}
      </button>

      {tooltipText && showTooltip && (
        <div className="absolute top-full mt-2 z-50 left-1/2 -translate-x-1/2">
          <div className="bg-slate-900 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
            {tooltipText}
          </div>
        </div>
      )}
    </div>
  );
};
