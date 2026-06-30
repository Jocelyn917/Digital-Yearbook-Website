import { CalendarPlus, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import EmptyState from './EmptyState.jsx';
import { formatDate, formatTime, sortUpcoming } from '../utils/date.js';

const blankHangout = { title: '', date: '', time: '', location: '', invitedIds: [] };

export default function HangoutPlanner({ classmates, hangouts, onSave, onDelete }) {
  const [form, setForm] = useState(blankHangout);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!editingId) setForm(blankHangout);
  }, [editingId]);

  function toggleInvite(id) {
    setForm((current) => ({
      ...current,
      invitedIds: current.invitedIds.includes(id) ? current.invitedIds.filter((inviteId) => inviteId !== id) : [...current.invitedIds, id],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ ...form, id: editingId || crypto.randomUUID() });
    setEditingId(null);
    setForm(blankHangout);
  }

  function startEdit(hangout) {
    setEditingId(hangout.id);
    setForm(hangout);
  }

  const upcoming = sortUpcoming(hangouts);

  return (
    <section className="two-column-section">
      <form className="panel form-grid compact" onSubmit={handleSubmit}>
        <div className="section-heading wide"><p className="eyebrow">Hangouts</p><h2>{editingId ? 'Edit hangout' : 'Schedule a hangout'}</h2></div>
        <label className="wide">Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
        <label>Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required /></label>
        <label>Time<input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} required /></label>
        <label className="wide">Location/link<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} required /></label>
        <fieldset className="wide invite-list">
          <legend>Invited classmates</legend>
          {classmates.map((classmate) => <label key={classmate.id}><input type="checkbox" checked={form.invitedIds.includes(classmate.id)} onChange={() => toggleInvite(classmate.id)} />{classmate.name}</label>)}
        </fieldset>
        <div className="form-actions wide">
          {editingId && <button type="button" className="ghost-button" onClick={() => setEditingId(null)}>Cancel</button>}
          <button className="primary-button" type="submit"><CalendarPlus size={18} />{editingId ? 'Save hangout' : 'Add hangout'}</button>
        </div>
      </form>
      <div className="panel list-panel">
        <div className="section-heading"><p className="eyebrow">Calendar</p><h2>Upcoming</h2></div>
        {upcoming.length > 0 ? <div className="event-list">{upcoming.map((hangout) => (
          <article className="event-row" key={hangout.id}>
            <div className="date-tile"><strong>{new Date(`${hangout.date}T00:00:00`).getDate()}</strong><span>{new Date(`${hangout.date}T00:00:00`).toLocaleString('en', { month: 'short' })}</span></div>
            <div><h3>{hangout.title}</h3><p>{formatDate(hangout.date)} at {formatTime(hangout.time)}</p><p>{hangout.location}</p><small>{hangout.invitedIds.map((id) => classmates.find((classmate) => classmate.id === id)?.name).filter(Boolean).join(', ') || 'No classmates invited yet'}</small></div>
            <div className="row-actions"><button className="icon-button" onClick={() => startEdit(hangout)} aria-label={`Edit ${hangout.title}`}><Pencil size={18} /></button><button className="icon-button danger" onClick={() => onDelete(hangout.id)} aria-label={`Delete ${hangout.title}`}><Trash2 size={18} /></button></div>
          </article>
        ))}</div> : <EmptyState title="No hangouts yet" message="Plan coffee, a reunion call, or a study-table comeback." />}
      </div>
    </section>
  );
}
