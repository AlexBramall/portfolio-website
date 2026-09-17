export function placeholder(id: string): string {
  return `[placeholder: ${id}]`;
}

export function isFilled(value: string | null | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && !trimmed.startsWith('[placeholder:');
}
