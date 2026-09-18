import { AboutChapter } from '../../types';
import { chapterEyebrowClassName } from '../../lib/chipStyles';

interface ChapterTileProps {
  chapter: AboutChapter;
  index: number;
}

export const ChapterTile = ({ chapter, index }: ChapterTileProps) => {
  return (
    <article className="rounded-card border border-border bg-surface p-6 shadow-card md:p-8">
      <p className={chapterEyebrowClassName(index)}>{chapter.employer}</p>
      <h3 className="mt-4 text-h3 text-text">{chapter.roleArc}</h3>
      <p className="mt-3 text-body text-text-secondary">{chapter.body}</p>
    </article>
  );
};
