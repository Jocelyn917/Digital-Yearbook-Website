import { Mail, Pencil, Trash2 } from 'lucide-react';

export default function ProfileCard({ classmate, onOpen, onEdit, onDelete }) {
  return (
    <article className="profile-card">
      <button className="profile-main" onClick={() => onOpen(classmate)} aria-label={`Open ${classmate.name}`}>
        <img src={classmate.photo} alt={classmate.name} />
        <div>
          <p className="eyebrow">Class of {classmate.gradYear}</p>
          <h3>{classmate.name}</h3>
          <p>{classmate.bio}</p>
        </div>
      </button>
      <div className="card-actions">
        <a className="icon-button" href={`mailto:${classmate.email}`} title="Email this person" aria-label={`Email ${classmate.name}`}>
          <Mail size={18} />
        </a>
        <button className="icon-button" onClick={() => onEdit(classmate)} title="Edit profile" aria-label={`Edit ${classmate.name}`}>
          <Pencil size={18} />
        </button>
        <button className="icon-button danger" onClick={() => onDelete(classmate.id)} title="Delete profile" aria-label={`Delete ${classmate.name}`}>
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}
