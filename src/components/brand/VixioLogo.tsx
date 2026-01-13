import { cn } from "@/lib/utils";

interface VixioLogoProps {
  variant?: "full" | "icon" | "text";
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: { width: 80, height: 24, iconSize: 24 },
  md: { width: 120, height: 36, iconSize: 36 },
  lg: { width: 160, height: 48, iconSize: 48 },
  xl: { width: 200, height: 60, iconSize: 60 },
};

export function VixioLogo({ 
  variant = "full", 
  showTagline = false, 
  className,
  size = "md" 
}: VixioLogoProps) {
  const { width, height, iconSize } = sizes[size];
  const gradientId = `vixio-gradient-${Math.random().toString(36).substr(2, 9)}`;

  // Icon only version
  if (variant === "icon") {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("flex-shrink-0", className)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#D8B4FE" />
          </linearGradient>
        </defs>
        {/* V shape with modern styling */}
        <path
          d="M8 12L24 38L40 12H32L24 28L16 12H8Z"
          fill={`url(#${gradientId})`}
        />
        {/* Decorative dot */}
        <circle cx="40" cy="12" r="4" fill={`url(#${gradientId})`} opacity="0.8" />
      </svg>
    );
  }

  // Text only version
  if (variant === "text") {
    return (
      <div className={cn("flex flex-col", className)}>
        <svg
          width={width}
          height={height * 0.6}
          viewBox="0 0 120 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#D8B4FE" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="22"
            fill={`url(#${gradientId})`}
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            fontSize="26"
            letterSpacing="-0.02em"
          >
            Vixio
          </text>
        </svg>
        {showTagline && (
          <span className="text-xs text-muted-foreground mt-0.5">
            Sistemas Inteligentes & Ciência de Dados
          </span>
        )}
      </div>
    );
  }

  // Full logo with icon + text
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Icon */}
      <svg
        width={iconSize * 0.9}
        height={iconSize * 0.9}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id={`${gradientId}-icon`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#D8B4FE" />
          </linearGradient>
        </defs>
        <path
          d="M8 12L24 38L40 12H32L24 28L16 12H8Z"
          fill={`url(#${gradientId}-icon)`}
        />
        <circle cx="40" cy="12" r="4" fill={`url(#${gradientId}-icon)`} opacity="0.8" />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <svg
          width={width * 0.7}
          height={height * 0.55}
          viewBox="0 0 100 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`${gradientId}-text`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#D8B4FE" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="20"
            fill={`url(#${gradientId}-text)`}
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            fontSize="24"
            letterSpacing="-0.02em"
          >
            Vixio
          </text>
        </svg>
        {showTagline && (
          <span className="text-[10px] text-muted-foreground -mt-1 tracking-wide">
            Sistemas Inteligentes & Ciência de Dados
          </span>
        )}
      </div>
    </div>
  );
}

// Animated version for hero sections
export function VixioLogoAnimated({ className }: { className?: string }) {
  const gradientId = `vixio-animated-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7">
            <animate
              attributeName="stop-color"
              values="#A855F7;#D8B4FE;#8B5CF6;#A855F7"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#8B5CF6">
            <animate
              attributeName="stop-color"
              values="#8B5CF6;#A855F7;#D8B4FE;#8B5CF6"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#D8B4FE">
            <animate
              attributeName="stop-color"
              values="#D8B4FE;#8B5CF6;#A855F7;#D8B4FE"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      
      {/* V Icon */}
      <path
        d="M10 15L30 45L50 15H42L30 35L18 15H10Z"
        fill={`url(#${gradientId})`}
      />
      <circle cx="50" cy="15" r="5" fill={`url(#${gradientId})`} opacity="0.8" />
      
      {/* Text */}
      <text
        x="60"
        y="38"
        fill={`url(#${gradientId})`}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="32"
        letterSpacing="-0.02em"
      >
        Vixio
      </text>
    </svg>
  );
}
