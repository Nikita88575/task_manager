import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  
  // Если массив пустой, показываем заглушку
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">☕</div>
        <h3>No tasks available</h3>
        <p>Can rest or add new tasks.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggleTask} 
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
}