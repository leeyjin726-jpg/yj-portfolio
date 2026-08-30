interface SectionTitleProps {
  word: string;
  subtitle: string;
  className?: string;
}

export function SectionTitle({ word, subtitle, className = "" }: SectionTitleProps) {
  return (
    <div className={`mb-16 ${className}`}>
      <h2 className="text-[clamp(40px,5vw,56px)] font-bold tracking-[-0.03em] leading-[1.05] text-foreground mb-4">
        {word}
        <span className="text-accent">.</span>
      </h2>
      <p className="text-[15px] text-softer leading-[1.7] max-w-[480px]">{subtitle}</p>
    </div>
  );
}
