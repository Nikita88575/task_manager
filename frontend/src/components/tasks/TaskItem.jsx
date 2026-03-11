import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, editTitle);
    }
    setIsEditing(false);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    }).replace(',', ''); 
  };

  const deadline = formatDueDate(task.due_date);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task)} 
        className="task-checkbox"
      />
      
      <div className="task-content">
        {isEditing ? (
          <div className="task-edit-mode">
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)}
              className="task-edit-input"
              autoFocus
            />
            <button onClick={handleSave} className="save-btn">💾</button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">❌</button>
          </div>
        ) : (
          <>
            <span className="task-title">{task.title}</span>
            <div className="task-meta">
              <span className={`task-badge priority-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              
              {deadline && (
                <span className="task-deadline">
                  ⏱️ {deadline}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="task-actions">
          <button onClick={() => setIsEditing(true)} className="edit-btn">✏️</button>
          <button onClick={() => onDelete(task.id)} className="delete-btn">🗑️</button>
        </div>
      )}
    </div>
  );
}