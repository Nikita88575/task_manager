export default function TaskFilter({ filter, setFilter, search, setSearch }) {
  return (
    <div className="task-filter-section">
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >All</button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >Active</button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >Completed</button>
      </div>

      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="task-search-input"
      />
    </div>
  );
}