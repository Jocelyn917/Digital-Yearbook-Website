import { Search } from 'lucide-react';
import EmptyState from './EmptyState.jsx';
import ProfileCard from './ProfileCard.jsx';

export default function Directory({ classmates, filters, setFilters, onOpen, onEdit, onDelete }) {
  const years = [...new Set(classmates.map((classmate) => classmate.gradYear))].sort();
  const filtered = classmates.filter((classmate) => {
    const matchesName = classmate.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesYear = filters.year === 'all' || classmate.gradYear === filters.year;
    return matchesName && matchesYear;
  });

  return (
    <section className="directory">
      <div className="section-heading"><p className="eyebrow">Directory</p><h2>Classmates</h2></div>
      <div className="filters">
        <label className="search-field"><Search size={18} /><input value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search by name" /></label>
        <select value={filters.year} onChange={(event) => setFilters((current) => ({ ...current, year: event.target.value }))}>
          <option value="all">All years</option>
          {years.map((year) => <option value={year} key={year}>Class of {year}</option>)}
        </select>
      </div>
      {filtered.length > 0 ? (
        <div className="profile-grid">{filtered.map((classmate) => <ProfileCard key={classmate.id} classmate={classmate} onOpen={onOpen} onEdit={onEdit} onDelete={onDelete} />)}</div>
      ) : (
        <EmptyState title="No classmates found" message="Try a different name or graduation year, or add someone new to the book." />
      )}
    </section>
  );
}
