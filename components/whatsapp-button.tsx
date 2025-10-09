"use client"

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return null
  const text = encodeURIComponent("I'm interested in ASBL projects.")
  const href = `https://wa.me/${number}?text=${text}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600"
      onClick={() => typeof window !== "undefined" && (window as any).dataLayer?.push({ event: "whatsapp_click" })}
    >
      {/* Simple WhatsApp glyph */}
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M19.11 17.15c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.18-.44-2.24-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.58.12-.12.28-.33.42-.5.14-.17.19-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-.99.97-.99 2.36 0 1.39 1.02 2.73 1.16 2.92.14.19 2 3.05 4.85 4.28.68.29 1.22.46 1.64.59.69.22 1.31.19 1.8.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33z" />
        <path d="M26.7 5.3C23.9 2.5 20.1 1 16 1S8.1 2.5 5.3 5.3C2.5 8.1 1 11.9 1 16c0 2.2.6 4.3 1.7 6.2L1 31l8.9-1.7c1.8 1.1 3.9 1.7 6.1 1.7 4.1 0 7.9-1.5 10.7-4.3 2.8-2.8 4.3-6.6 4.3-10.7S29.5 8.1 26.7 5.3zm-2.5 19.9C21.9 27.5 19 28.7 16 28.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-5.3 1 1.1-5.2-.2-.3c-1-1.6-1.6-3.5-1.6-5.5C4.3 9 9.6 3.7 16 3.7S27.7 9 27.7 16 22.4 27.5 20.2 29.2z" />
      </svg>
    </a>
  )
}
