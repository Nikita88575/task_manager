import { useState, useEffect, useCallback } from 'react';
import api from '../../api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import ProgressStats from './ProgressStats';

export default function TaskDashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter === 'active') params.append('completed', 'False');
      if (filter === 'completed') params.append('completed', 'True');
      if (search) params.append('search', search);

      const response = await api.get(`tasks/?${params.toString()}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  }, [filter, search]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleAddTask = async (taskData) => {
    const response = await api.post('tasks/', taskData);
    setTasks([response.data, ...tasks]); 
    return true; 
  };

  const handleToggleTask = async (task) => {
    const response = await api.patch(`tasks/${task.id}/`, { completed: !task.completed });
    setTasks(tasks.map(t => t.id === task.id ? response.data : t));
  };

  const handleDeleteTask = async (taskId) => {
    await api.delete(`tasks/${taskId}/`);
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  // Новая функция для сохранения отредактированного текста
  const handleEditTask = async (taskId, newTitle) => {
    const response = await api.patch(`tasks/${taskId}/`, { title: newTitle });
    setTasks(tasks.map(t => t.id === taskId ? response.data : t));
  };

  return (
    <div className="dashboard-container">
      {/* Шапка с выходом */}
      <header className="dashboard-header">
        <h1 className="logo-text">⚡ Task Manager</h1>
        <button onClick={onLogout} className="logout-btn">
          🚪 Выйти
        </button>
      </header>

      <div className="dashboard-grid">
        {/* Левая колонка: Статистика */}
        <aside className="dashboard-sidebar">
          <ProgressStats tasks={tasks} />
        </aside>

        {/* Правая колонка: Форма и Задачи */}
        <main className="dashboard-main">
          <TaskForm onAddTask={handleAddTask} />
          
          <TaskFilter 
            filter={filter} setFilter={setFilter} 
            search={search} setSearch={setSearch} 
          />
          
          <div className="task-list-wrapper">
            <TaskList 
              tasks={tasks} 
              onToggleTask={handleToggleTask} 
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask} // Передаем функцию редактирования
            />
          </div>
        </main>
      </div>
    </div>
  );
}