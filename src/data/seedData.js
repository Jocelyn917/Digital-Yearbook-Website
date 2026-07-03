export const seedClassmates = [
  {
    id: 'c-1',
    name: 'Maya Chen',
    gradYear: '2026',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
    bio: 'Debate captain, ceramics enthusiast, and keeper of the best study playlists.',
    memory: 'The senior sunrise breakfast when everyone wrote wishes on paper lanterns.',
    email: 'maya.chen@example.com',
    note: 'Ask about the summer design program.',
  },
  {
    id: 'c-2',
    name: 'Jordan Alvarez',
    gradYear: '2025',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    bio: 'Varsity soccer midfielder who somehow made AP Bio flashcards fun.',
    memory: 'Scoring the overtime goal at homecoming under the lights.',
    email: 'jordan.alvarez@example.com',
    note: '',
  },
  {
    id: 'c-3',
    name: 'Priya Nair',
    gradYear: '2026',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    bio: 'Yearbook editor, robotics builder, and unofficial hallway photographer.',
    memory: 'The robotics team turning the cafeteria into a tiny workshop before regionals.',
    email: 'priya.nair@example.com',
    note: 'Send reunion invite.',
  },
  {
    id: 'c-4',
    name: 'Sam Taylor',
    gradYear: '2024',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    bio: 'Jazz band drummer, chess club regular, and fan of late library afternoons.',
    memory: 'Playing the last song at spring concert while the whole auditorium clapped along.',
    email: 'sam.taylor@example.com',
    note: '',
  },
];

export const seedHangouts = [
  {
    id: 'h-1',
    title: 'Coffee after campus tour',
    date: '2026-07-10',
    time: '14:30',
    location: 'Maple Street Cafe',
    invitedIds: ['c-1', 'c-3'],
  },
  {
    id: 'h-2',
    title: 'Virtual reunion planning',
    date: '2026-08-02',
    time: '19:00',
    location: 'https://meet.example.com/yearbook',
    invitedIds: ['c-1', 'c-2', 'c-4'],
  },
];

export const seedReminders = [
  {
    id: 'r-1',
    title: 'Graduation anniversary',
    date: '2027-06-12',
    type: 'Graduation',
    notes: 'Share the senior slideshow and favorite photos.',
  },
  {
    id: 'r-2',
    title: 'Friendship anniversary with Priya',
    date: '2026-09-18',
    type: 'Friendship',
    notes: 'Met at the yearbook room open house.',
  },
];
