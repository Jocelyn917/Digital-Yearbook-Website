import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';

const blankProfile = {
  name: '',
  gradYear: '2026',
  photo: '',
  bio: '',
  memory: '',
  email: '',
  note: '',
};

export default function ProfileForm({ editingProfile, onSubmit, onCancel }) {
  const [form, setForm] = useState(blankProfile);

  useEffect(() => {
    setForm(editingProfile || blankProfile);
  }, [editingProfile]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...form,
      photo: form.photo || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(form.name || 'Yearbook')}`,
    });
    setForm(blankProfile);
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit}>
      <div className="section-heading wide">
        <p className="eyebrow">Profiles</p>
        <h2>{editingProfile ? 'Edit classmate' : 'Add a classmate'}</h2>
      </div>
      <label>Name<input value={form.name} onChange={(event) => updateField('name', event.target.value)} required /></label>
      <label>Graduation year<input value={form.gradYear} onChange={(event) => updateField('gradYear', event.target.value)} required /></label>
      <label className="wide">Photo/avatar URL<input value={form.photo} onChange={(event) => updateField('photo', event.target.value)} placeholder="Leave blank for generated initials" /></label>
      <label className="wide">Bio<textarea value={form.bio} onChange={(event) => updateField('bio', event.target.value)} required /></label>
      <label className="wide">Favorite memory<textarea value={form.memory} onChange={(event) => updateField('memory', event.target.value)} required /></label>
      <label>Email/contact<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required /></label>
      <label>Optional note<input value={form.note || ''} onChange={(event) => updateField('note', event.target.value)} /></label>
      <div className="form-actions wide">
        {editingProfile && <button type="button" className="ghost-button" onClick={onCancel}>Cancel</button>}
        <button className="primary-button" type="submit"><Save size={18} />{editingProfile ? 'Save profile' : 'Create profile'}</button>
      </div>
    </form>
  );
}
