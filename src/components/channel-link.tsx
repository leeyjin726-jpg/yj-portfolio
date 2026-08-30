interface ChannelLinkProps {
  name: string;
  handle: string;
  url: string;
  actionLabel: string;
}

export function ChannelLink({ name, handle, url, actionLabel }: ChannelLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-4 border-b border-line first:border-t"
    >
      <div>
        <p
          translate="no"
          className="notranslate text-[15px] text-foreground group-hover:text-accent transition-colors"
        >
          {name}
        </p>
        <p translate="no" className="notranslate caption-meta">
          {handle}
        </p>
      </div>
      <span translate="no" className="notranslate action-link">
        {actionLabel}
      </span>
    </a>
  );
}
