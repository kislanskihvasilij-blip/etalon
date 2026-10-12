const LINKS = [
  { href: "https://t.me/stroit_krasnodar", label: "Telegram" },
  { href: "https://vk.ru/club230027470", label: "VKontakte" },
]

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <path
        d="m21.5 2.5-19 7.3c-.7.3-.7 1.3 0 1.6l4.8 1.6 1.8 5.9c.2.6 1 .8 1.4.3l2.5-2.9 4.9 3.6c.6.4 1.5.1 1.6-.6l3.2-16c.1-.7-.5-1.1-1.2-.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

function VkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="currentColor">
        VK
      </text>
    </svg>
  )
}

const ICONS = { Telegram: TelegramIcon, VKontakte: VkIcon }

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-links${className ? ` ${className}` : ""}`}>
      {LINKS.map((link) => {
        const Icon = ICONS[link.label as keyof typeof ICONS]
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="social-link"
          >
            <Icon />
          </a>
        )
      })}
    </div>
  )
}
