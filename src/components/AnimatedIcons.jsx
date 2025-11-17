export function AnimatedCake({ size = 80, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <g>
        <ellipse cx="50" cy="85" rx="35" ry="8" fill="#f472b6" opacity="0.3" />
        <rect x="20" y="60" width="60" height="25" rx="3" fill="#ec4899" />
        <rect x="20" y="60" width="60" height="5" rx="3" fill="#f472b6" />
        <rect x="25" y="40" width="50" height="20" rx="3" fill="#a855f7" />
        <rect x="25" y="40" width="50" height="4" rx="3" fill="#c084fc" />
        <rect x="30" y="25" width="40" height="15" rx="3" fill="#ec4899" />
        <rect x="30" y="25" width="40" height="3" rx="3" fill="#f472b6" />
        
        <g>
          <rect x="38" y="15" width="4" height="12" rx="1" fill="#fbbf24">
            <animate attributeName="height" values="12;14;12" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y" values="15;13;15" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="58" y="15" width="4" height="12" rx="1" fill="#fbbf24">
            <animate attributeName="height" values="12;14;12" dur="2s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="y" values="15;13;15" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </rect>
          
          <ellipse cx="40" cy="13" rx="3" ry="5" fill="#fb923c">
            <animate attributeName="ry" values="5;7;5" dur="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.8;1" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="40" cy="11" rx="2" ry="3" fill="#fbbf24">
            <animate attributeName="ry" values="3;5;3" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="60" cy="13" rx="3" ry="5" fill="#fb923c">
            <animate attributeName="ry" values="5;7;5" dur="0.5s" begin="0.25s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.8;1" dur="0.5s" begin="0.25s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="60" cy="11" rx="2" ry="3" fill="#fbbf24">
            <animate attributeName="ry" values="3;5;3" dur="0.5s" begin="0.25s" repeatCount="indefinite" />
          </ellipse>
        </g>
        
        <circle cx="35" cy="70" r="3" fill="#fbbf24" />
        <circle cx="50" cy="73" r="3" fill="#fbbf24" />
        <circle cx="65" cy="70" r="3" fill="#fbbf24" />
        <circle cx="40" cy="48" r="2.5" fill="#fbbf24" />
        <circle cx="60" cy="48" r="2.5" fill="#fbbf24" />
      </g>
    </svg>
  );
}

// Animated Heart Component
export function AnimatedHeart({ size = 60, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id={`heartGradient-${size}`}>
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <filter id={`glow-${size}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M50,85 C50,85 15,60 15,40 C15,25 25,20 35,25 C40,27 45,32 50,40 C55,32 60,27 65,25 C75,20 85,25 85,40 C85,60 50,85 50,85 Z"
        fill={`url(#heartGradient-${size})`}
        filter={`url(#glow-${size})`}
      >
        <animate attributeName="d" 
          values="M50,85 C50,85 15,60 15,40 C15,25 25,20 35,25 C40,27 45,32 50,40 C55,32 60,27 65,25 C75,20 85,25 85,40 C85,60 50,85 50,85 Z;
                  M50,87 C50,87 13,58 13,38 C13,23 23,18 33,23 C38,25 43,30 50,40 C57,30 62,25 67,23 C77,18 87,23 87,38 C87,58 50,87 50,87 Z;
                  M50,85 C50,85 15,60 15,40 C15,25 25,20 35,25 C40,27 45,32 50,40 C55,32 60,27 65,25 C75,20 85,25 85,40 C85,60 50,85 50,85 Z"
          dur="1.5s"
          repeatCount="indefinite" 
        />
      </path>
    </svg>
  );
}

// Animated Gift Component  
export function AnimatedGift({ size = 60, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id={`giftGradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      <rect x="20" y="40" width="60" height="50" rx="3" fill={`url(#giftGradient-${size})`}>
        <animate attributeName="y" values="40;38;40" dur="2s" repeatCount="indefinite" />
      </rect>
      
      <rect x="47" y="40" width="6" height="50" fill="#fbbf24" />
      <rect x="20" y="57" width="60" height="6" fill="#fbbf24" />
      
      <g transform="translate(50, 35)">
        <ellipse cx="-8" cy="0" rx="8" ry="6" fill="#fbbf24">
          <animate attributeName="rx" values="8;9;8" dur="2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="8" cy="0" rx="8" ry="6" fill="#fbbf24">
          <animate attributeName="rx" values="8;9;8" dur="2s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="0" cy="0" r="4" fill="#fb923c" />
        
        <circle cx="-20" cy="-5" r="2" fill="#fbbf24">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="-5" r="2" fill="#fbbf24">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="-15" r="2" fill="#fbbf24">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

// Animated Sparkle Component
export function AnimatedSparkle({ size = 40, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id={`sparkleGradient-${size}`}>
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ec4899" />
        </radialGradient>
      </defs>
      <g transform="translate(50, 50)">
        <path
          d="M 0,-30 L 2,-8 L 30,0 L 2,8 L 0,30 L -2,8 L -30,0 L -2,-8 Z"
          fill={`url(#sparkleGradient-${size})`}
          opacity="0.8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="0" cy="0" r="5" fill="#ffffff">
          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

// Animated Crown Component
export function AnimatedCrown({ size = 60, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id={`crownGradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <g transform="translate(50, 50)">
        <path
          d="M -30,15 L -25,-10 L -15,0 L 0,-15 L 15,0 L 25,-10 L 30,15 Z"
          fill={`url(#crownGradient-${size})`}
          stroke="#d97706"
          strokeWidth="2"
        >
          <animate attributeName="d"
            values="M -30,15 L -25,-10 L -15,0 L 0,-15 L 15,0 L 25,-10 L 30,15 Z;
                    M -30,15 L -25,-12 L -15,-2 L 0,-17 L 15,-2 L 25,-12 L 30,15 Z;
                    M -30,15 L -25,-10 L -15,0 L 0,-15 L 15,0 L 25,-10 L 30,15 Z"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        <circle cx="-25" cy="-10" r="4" fill="#ec4899">
          <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="-15" r="5" fill="#a855f7">
          <animate attributeName="r" values="5;6;5" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="-10" r="4" fill="#ec4899">
          <animate attributeName="r" values="4;5;4" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        
        <line x1="-25" y1="-15" x2="-22" y2="-18" stroke="#ffffff" strokeWidth="2" opacity="0.8">
          <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="0" y1="-20" x2="3" y2="-23" stroke="#ffffff" strokeWidth="2" opacity="0.8">
          <animate attributeName="opacity" values="0;0.8;0" dur="3s" begin="1s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}