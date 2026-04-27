'use client';

interface InputTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  type?: string;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export function InputText({ placeholder = '', value, onChange, name, type = 'text', error, label, required, className = '' }: InputTextProps) {
  const input = (
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`h-11 rounded-lg bg-[var(--bg-elevated)] border ${error ? 'border-[var(--danger)]' : 'border-[var(--border)]'} px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full ${className}`}
    />
  );

  if (!label) return input;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[var(--text-primary)]">
        {label}{required && <span className="text-[var(--danger)]"> *</span>}
      </label>
      {input}
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
}
