import { BellPlus, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import EmptyState from './EmptyState.jsx';
import { formatDate, sortUpcoming } from '../utils/date.js';

const blankReminder = { title: '', date: '', type: 'Reunion', notes: '' };

export default function ReminderBoard({ reminders, onSave, onDelete }) {
  const [form, setForm] = useState(blankReminder);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!editingId) setForm(blankReminder);
  }, [editingId]);

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ ...form, id: editingId || crypto.randomUUID() });
    setForm(blankReminder);
    setEditingId(null);
  }

  function startEdit(reminder) {
    setEditingId(reminder.id);
    setForm(reminder);
  }

  const upcoming = sortUpcoming(reminders);

  return (
    <section className="two-column-section">
      <form className="panel form-grid compact" onSubmit={handleSubmit}>
        <div className="section-heading wide"><p className="eyebrow">Reminders</p><h2>{editingId ? 'Edit reminder' : 'Add a date'}</h2></div>
        <label className="wide">Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
        <label>Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required /></label>
        <label>Type<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}><option>Graduation</option><option>Friendship</option><option>Reunion</option><option>Birthday</option><option>Other</option></select></label>
        <label className="wide">Notes<textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
        <div className="form-actions wide">{editingId && <button type="button" className="ghost-button" onClick={() => setEditingId(null)}>Cancel</button>}<button className="primary-button" type="submit"><BellPlus size={18} />{editingId ? 'Save reminder' : 'Add reminder'}</button></div>
      </form>
      <div className="panel list-panel">
        <div className="section-heading"><p className="eyebrow">Anniversaries</p><h2>Coming up</h2></div>
        {upcoming.length > 0 ? <div className="event-list">{upcoming.map((reminder) => (
          <article className="event-row reminder-row" key={reminder.id}>
            <div className="date-tile"><strong>{new Date(`${reminder.date}T00:00:00`).getDate()}</strong><span>{new Date(`${reminder.date}T00:00:00`).toLocaleString('en', { month: 'short' })}</span></div>
            <div><span className="tag">{reminder.type}</span><h3>{reminder.title}</h3><p>{formatDate(reminder.date)}</p>{reminder.notes && <small>{reminder.notes}</small>}</div>
            <div className="row-actions"><button className="icon-button" onClick={() => startEdit(reminder)} aria-label={`Edit ${reminder.title}`}><Pencil size={18} /></button><button className="icon-button danger" onClick={() => onDelete(reminder.id)} aria-label={`Delete ${reminder.title}`}><Trash2 size={18} /></button></div>
          </article>
        ))}</div> : <EmptyState title="No reminders saved" message="Add reunions, anniversaries, and the little dates worth keeping." />}
      </div>
    </section>
  );
}
