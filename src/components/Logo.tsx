export function Logo() {
  return (
    <a href="#top" className="logo">
      <svg
        className="logo-full"
        viewBox="0 0 259 72"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ЭТАЛОН, строительная компания"
      >
        <defs>
          <linearGradient id="logoRoof" x1="0" y1="0" x2="71" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f8813f" />
            <stop offset="1" stopColor="#ee5844" />
          </linearGradient>
          <linearGradient id="logoRightBlock" x1="0" y1="16" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#06c2de" />
            <stop offset="1" stopColor="#00a3c4" />
          </linearGradient>
          <linearGradient id="logoLeftBlock" x1="0" y1="31" x2="0" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#04c6e6" />
            <stop offset="1" stopColor="#005478" />
          </linearGradient>
          <linearGradient id="logoBottomBlock" x1="0" y1="49" x2="0" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0099c6" />
            <stop offset="1" stopColor="#0089b4" />
          </linearGradient>
          <linearGradient id="logoBadge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f6935e" />
            <stop offset="1" stopColor="#f2593f" />
          </linearGradient>
        </defs>

        <path d="M33,1 L71,31 L0,31 Z" fill="url(#logoRoof)" />
        <rect x="44" y="16" width="27" height="32" fill="url(#logoRightBlock)" />
        <rect x="0" y="31" width="26" height="41" fill="url(#logoLeftBlock)" />
        <rect x="27" y="49" width="43" height="23" fill="url(#logoBottomBlock)" />

        <text x="80" y="43" fontFamily="'Host Grotesk', sans-serif" fontWeight="800" fontSize="36" letterSpacing="1" fill="#046689">
          ЭТАЛОН
        </text>

        <rect x="81" y="53" width="150" height="17" rx="1.5" fill="url(#logoBadge)" />
        <text x="90" y="65.5" fontFamily="'Host Grotesk', sans-serif" fontWeight="700" fontSize="10.5" letterSpacing="0.3" fill="#fffdfb">
          строительная компания
        </text>
      </svg>
    </a>
  )
}
