import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Card from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressStats({ tasks }) {
  const [timeRange, setTimeRange] = useState('all'); // 'today', 'week', 'all'

  // 1. Фильтрация по времени
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.created_at);
    if (timeRange === 'today') return taskDate >= todayStart;
    if (timeRange === 'week') return taskDate >= weekStart;
    return true; // 'all'
  });

  const total = filteredTasks.length;
  const completedTotal = filteredTasks.filter(t => t.completed).length;
  const progressPercent = total === 0 ? 0 : Math.round((completedTotal / total) * 100);

  // 2. Считаем НЕВЫПОЛНЕННЫЕ (это будет серая/пустая часть)
  const pendingTotal = total - completedTotal;

  // 3. Считаем ВЫПОЛНЕННЫЕ по приоритетам (это будут цветные куски)
  const completedHigh = filteredTasks.filter(t => t.completed && t.priority === 'HIGH').length;
  const completedMedium = filteredTasks.filter(t => t.completed && t.priority === 'MEDIUM').length;
  const completedLow = filteredTasks.filter(t => t.completed && t.priority === 'LOW').length;

  // 4. Собираем график: Серое (Осталось) + Красное (Готово Выс) + Желтое (Готово Ср) + Зеленое (Готово Лич)
  const chartData = {
    labels: ['Выполнено: Высокий', 'Выполнено: Средний', 'Выполнено: Низкий', 'Осталось'],
    datasets: [{
      data: [completedHigh, completedMedium, completedLow, pendingTotal],
      backgroundColor: [
          '#ef4444', // Красный
          '#f59e0b', // Желтый
          '#10b981', // Зеленый
          '#334155', // Серый (slate-700) - невыполненная часть
      ],
      borderWidth: 0,
      cutout: '80%', // Толщина кольца
    }]
  };

  return (
    <Card className="stats-card">
      <div className="stats-header">
        <h3>Прогресс задач</h3>
        
        <div className="time-toggles">
          <button 
            className={timeRange === 'today' ? 'active' : ''} 
            onClick={() => setTimeRange('today')}
          >День</button>
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >Неделя</button>
          <button 
            className={timeRange === 'all' ? 'active' : ''} 
            onClick={() => setTimeRange('all')}
          >Всё</button>
        </div>
      </div>

      <div className="chart-container">
        {total === 0 ? (
          <p className="no-data-text">Нет задач за этот период</p>
        ) : (
          <div className="chart-main">
            <Doughnut 
              data={chartData} 
              options={{ 
                plugins: { legend: { display: false } }, 
                maintainAspectRatio: false, 
                
              }} 
            />
            {/* Центр кольца */}
            <div className="chart-center-text">
               {progressPercent}%
               <span className="chart-center-sub">выполнено</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Легенда под графиком */}
      {total > 0 && (
        <div className="stats-legend-grid">
          <div className="legend-item"><span className="dot gray"></span> Осталось: {pendingTotal}</div>
          <div className="legend-item"><span className="dot high"></span> Выс: {completedHigh}</div>
          <div className="legend-item"><span className="dot medium"></span> Ср: {completedMedium}</div>
          <div className="legend-item"><span className="dot low"></span> Низк: {completedLow}</div>
        </div>
      )}
    </Card>
  );
}