import PhotoUpload from "./components/PhotoUpload";
import { BookMarked, CalendarDays, GraduationCap, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import Directory from './components/Directory.jsx';
import HangoutPlanner from './components/HangoutPlanner.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import ProfileModal from './components/ProfileModal.jsx';
import ReminderBoard from './components/ReminderBoard.jsx';
import { seedClassmates, seedHangouts, seedReminders } from './data/seedData.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';

export default function App() {
  const [classmates, setClassmates] = useLocalStorage('yearbook-classmates', seedClassmates);
  const [hangouts, setHangouts] = useLocalStorage('yearbook-hangouts', seedHangouts);
  const [reminders, setReminders] = useLocalStorage('yearbook-reminders', seedReminders);
  const [filters, setFilters] = useState({ search: '', year: 'all' });
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);

  const stats = useMemo(() => [
    { label: 'Classmates', value: classmates.length },
    { label: 'Hangouts', value: hangouts.length },
    { label: 'Reminders', value: reminders.length },
  ], [classmates.length, hangouts.length, reminders.length]);

  function saveProfile(profile) {
    if (profile.id) {
      setClassmates((current) => current.map((classmate) => (classmate.id === profile.id ? profile : classmate)));
    } else {
      setClassmates((current) => [{ ...profile, id: crypto.randomUUID() }, ...current]);
    }
    setEditingProfile(null);
  }

  function deleteProfile(id) {
    setClassmates((current) => current.filter((classmate) => classmate.id !== id));
    setHangouts((current) => current.map((hangout) => ({ ...hangout, invitedIds: hangout.invitedIds.filter((inviteId) => inviteId !== id) })));
    if (selectedProfile?.id === id) setSelectedProfile(null);
  }

  function saveNote(id, note) {
    setClassmates((current) => current.map((classmate) => (classmate.id === id ? { ...classmate, note } : classmate)));
    setSelectedProfile((current) => (current?.id === id ? { ...current, note } : current));
  }

  function saveHangout(hangout) {
    setHangouts((current) => current.some((item) => item.id === hangout.id) ? current.map((item) => (item.id === hangout.id ? hangout : item)) : [hangout, ...current]);
  }

  function saveReminder(reminder) {
    setReminders((current) => current.some((item) => item.id === reminder.id) ? current.map((item) => (item.id === reminder.id ? reminder : item)) : [reminder, ...current]);
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <nav>
          <div className="brand"><BookMarked size={28} /><span>Digital Yearbook</span></div>
          <div className="nav-links"><a href="#directory">Directory</a><a href="#hangouts">Hangouts</a><a href="#reminders">Reminders</a></div>
        </nav>
        <div className="hero-content">
          <div>
            <p className="eyebrow"><Sparkles size={16} />Cozy scrapbook for keeping people close</p>
            <h1>Digital Yearbook</h1>
            <p>Save classmate profiles, notes, hangout plans, and reunion reminders in one warm little corner of the web.</p>
          </div>
          <div className="stat-strip" aria-label="Yearbook summary">
            {stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
      </header>
      <main>
        <section className="intro-band">
          <div><GraduationCap size={24} /><p>Everything is stored in this browser with localStorage, so the prototype feels real without needing a backend yet.</p></div>
          <div><CalendarDays size={24} /><p>Seed classmates, hangouts, and reminders are included so the yearbook starts with a little life in it.</p></div>
        </section>
        <section id="directory" className="stacked-section">
          <ProfileForm editingProfile={editingProfile} onSubmit={saveProfile} onCancel={() => setEditingProfile(null)} />
          <Directory classmates={classmates} filters={filters} setFilters={setFilters} onOpen={setSelectedProfile} onEdit={setEditingProfile} onDelete={deleteProfile} />
        </section>
        <section id="hangouts"><HangoutPlanner classmates={classmates} hangouts={hangouts} onSave={saveHangout} onDelete={(id) => setHangouts((current) => current.filter((hangout) => hangout.id !== id))} /></section>
        <section id="reminders"><ReminderBoard reminders={reminders} onSave={saveReminder} onDelete={(id) => setReminders((current) => current.filter((reminder) => reminder.id !== id))} /></section>
      </main>
      <ProfileModal classmate={selectedProfile} onClose={() => setSelectedProfile(null)} onNoteSave={saveNote} />
    </div>
  );
}
