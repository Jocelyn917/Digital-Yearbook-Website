import { BookOpen } from 'lucide-react';

export default function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <BookOpen size={28} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
