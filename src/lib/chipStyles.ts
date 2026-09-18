const tagWashes = [
  'bg-accent-subtle text-accent',
  'bg-accent-subtle text-accent',
  'bg-accent-2-subtle text-accent-2',
  'bg-accent-3-subtle text-accent-3',
] as const;

const stackWashes = [
  'bg-accent-subtle text-accent',
  'bg-accent-subtle text-accent',
  'bg-accent-2-subtle text-accent-2',
  'bg-accent-subtle text-accent',
  'bg-accent-2-subtle text-accent-2',
  'bg-accent-3-subtle text-accent-3',
] as const;

export function tagChipClassName(index: number): string {
  return `rounded-pill px-2.5 py-1 text-caption ${tagWashes[index % tagWashes.length]}`;
}

export function stackChipClassName(index: number): string {
  return `rounded-pill px-3 py-1.5 text-caption ${stackWashes[index % stackWashes.length]}`;
}

const chapterEyebrowWashes = [
  'bg-accent-2-subtle text-accent-2',
  'bg-accent-3-subtle text-accent-3',
  'bg-accent-2-subtle text-accent-2',
] as const;

export function chapterEyebrowClassName(index: number): string {
  return `inline-flex rounded-pill px-3 py-1 text-caption ${chapterEyebrowWashes[index % chapterEyebrowWashes.length]}`;
}
