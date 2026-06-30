import { Mail, X } from 'lucide-react';

export default function ProfileModal({ classmate, onClose, onNoteSave }) {
  if (!classmate) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close profile">
          <X size={20} />
        </button>
        <img src={classmate.photo} alt={classmate.name} />
        <div className="modal-copy">
          <p className="eyebrow">Class of {classmate.gradYear}</p>
          <h2 id="profile-title">{classmate.name}</h2>
          <p>{classmate.bio}</p>
          <div className="memory-box">
            <span>Favorite memory</span>
            <p>{classmate.memory}</p>
          </div>
          <a className="primary-button" href={`mailto:${classmate.email}`}>
            <Mail size={18} />
            Email this person
          </a>
          <label>
            Private note
            <textarea
              value={classmate.note || ''}
              onChange={(event) => onNoteSave(classmate.id, event.target.value)}
              placeholder="Add a reminder, inside joke, or follow-up..."
            />
          </label>
        </div>
      </section>
    </div>
  );
}
