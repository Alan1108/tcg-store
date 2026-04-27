'use client';

interface InputTextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  rows?: number;
  className?: string;
}

export function InputTextarea({ placeholder = '', value, onChange, label, rows = 4, className = '' }: InputTextareaProps) {
  const textarea = (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full resize-none ${className}`}
    />
  );

  if (!label) return textarea;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[var(--text-primary)]">{label}</label>
      {textarea}
    </div>
  );
}
