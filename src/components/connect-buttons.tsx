interface ConnectButtonsProps {
  email: string;
  kakaoOpenChat: string;
}

export function ConnectButtons({ email, kakaoOpenChat }: ConnectButtonsProps) {
  return (
    <div className="flex flex-col gap-4 max-w-[420px] mx-auto">
      <a
        href={kakaoOpenChat}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 h-14 rounded-full bg-[#FEE500] text-[#1A1A1A] text-[15px] font-medium transition-transform hover:scale-[1.02]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.76 1.84 5.19 4.62 6.58-.2.75-.73 2.73-.84 3.16-.13.53.2.52.42.38.17-.11 2.75-1.87 3.87-2.63.63.09 1.28.14 1.93.14 5.523 0 10-3.477 10-7.8C22 6.477 17.523 3 12 3Z" />
        </svg>
        카카오톡 오픈채팅
      </a>

      <a
        href={`mailto:${email}`}
        className="group flex items-center justify-center gap-2 h-14 rounded-full border border-line text-foreground text-[15px] font-medium transition-colors hover:border-accent hover:text-accent"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
        {email}
      </a>
    </div>
  );
}
