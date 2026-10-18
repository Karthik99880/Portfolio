export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[12px] tracking-[0.02em] text-muted">{children}</span>;
}

export function TagList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 ${className}`.trim()} aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
