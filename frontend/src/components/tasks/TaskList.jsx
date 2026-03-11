import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  
  // Если массив пустой, показываем заглушку
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">☕</div>
        <h3>Ура! На сегодня задач нет.</h3>
        <p>Можно отдохнуть или добавить новые.</p>
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
        />
      ))}
    </div>
  );
}