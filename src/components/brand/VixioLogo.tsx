import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-vixio-icon.png";
import logoDark from "@/assets/logo-vixio-dark.png";
import logoLight from "@/assets/logo-vixio-light.png";

interface VixioLogoProps {
  variant?: "full" | "icon";
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "light" | "dark";
}

const sizes = {
  sm: { width: 100, height: 32 },
  md: { width: 140, height: 45 },
  lg: { width: 180, height: 58 },
  xl: { width: 280, height: 90 },
};

const iconSizes = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 60,
};

export const VixioLogo = forwardRef<HTMLDivElement, VixioLogoProps>(({ 
  variant = "full", 
  showTagline = false, 
  className,
  size = "md",
  theme = "dark"
}, ref) => {
  const { width, height } = sizes[size];
  const iconSize = iconSizes[size];

  // Icon only version (just the V symbol)
  if (variant === "icon") {
    return (
      <div ref={ref} className={cn("flex flex-col items-center", className)}>
        <img
          src={logoFull}
          alt="Vixio"
          width={iconSize}
          height={iconSize}
          className="object-contain"
        />
        {showTagline && (
          <span className="text-xs text-muted-foreground mt-1 text-center">
            Sistemas Inteligentes & Ciência de Dados
          </span>
        )}
      </div>
    );
  }

  // Full logo with name - use dark version for dark backgrounds, light for light backgrounds
  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      <img
        src={logoSrc}
        alt="Vixio - Sistemas Inteligentes & Ciência de Dados"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
});

VixioLogo.displayName = "VixioLogo";

// Animated version that pulses the logo
export const VixioLogoAnimated = forwardRef<HTMLDivElement, { className?: string; size?: "sm" | "md" | "lg" | "xl" }>(
  ({ className, size = "xl" }, ref) => {
    const { width, height } = sizes[size];

    return (
      <div ref={ref} className={cn("relative", className)}>
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl opacity-30 animate-pulse">
          <img
            src={logoDark}
            alt=""
            width={width}
            height={height}
            className="object-contain"
          />
        </div>
        {/* Main logo */}
        <img
          src={logoDark}
          alt="Vixio - Sistemas Inteligentes & Ciência de Dados"
          width={width}
          height={height}
          className="object-contain relative z-10"
        />
      </div>
    );
  }
);

VixioLogoAnimated.displayName = "VixioLogoAnimated";
