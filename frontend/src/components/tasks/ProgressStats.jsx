import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Card from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressStats({ tasks }) {
  const [timeRange, setTimeRange] = useState('all'); // 'today', 'week', 'all'

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.created_at);
    if (timeRange === 'today') return taskDate >= todayStart;
    if (timeRange === 'week') return taskDate >= weekStart;
    return true; 
  });

  const total = filteredTasks.length;
  const completedTotal = filteredTasks.filter(t => t.completed).length;
  const progressPercent = total === 0 ? 0 : Math.round((completedTotal / total) * 100);

  const pendingTotal = total - completedTotal;

  const completedHigh = filteredTasks.filter(t => t.completed && t.priority === 'HIGH').length;
  const completedMedium = filteredTasks.filter(t => t.completed && t.priority === 'MEDIUM').length;
  const completedLow = filteredTasks.filter(t => t.completed && t.priority === 'LOW').length;

  const chartData = {
    labels: ['Completed: High', 'Completed: Medium', 'Completed: Low', 'Pending'],
    datasets: [{
      data: [completedHigh, completedMedium, completedLow, pendingTotal],
      backgroundColor: [
          '#ef4444', 
          '#f59e0b', 
          '#10b981', 
          '#334155', 
      ],
      borderWidth: 0,
      cutout: '80%', 
    }]
  };

  return (
    <Card className="stats-card">
      <div className="stats-header">
        <h3>Task Progress</h3>
        
        <div className="time-toggles">
          <button 
            className={timeRange === 'today' ? 'active' : ''} 
            onClick={() => setTimeRange('today')}
          >Day</button>
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >Week</button>
          <button 
            className={timeRange === 'all' ? 'active' : ''} 
            onClick={() => setTimeRange('all')}
          >All</button>
        </div>
      </div>

      <div className="chart-container">
        {total === 0 ? (
          <p className="no-data-text">No tasks for this period</p>
        ) : (
          <div className="chart-main">
            <Doughnut 
              data={chartData} 
              options={{ 
                plugins: { legend: { display: false } }, 
                maintainAspectRatio: false, 
              }} 
            />
            <div className="chart-center-text">
               {progressPercent}%
               <span className="chart-center-sub">completed</span>
            </div>
          </div>
        )}
      </div>
      
      {total > 0 && (
        <div className="stats-legend-grid">
          <div className="legend-item"><span className="dot gray"></span> Pending: {pendingTotal}</div>
          <div className="legend-item"><span className="dot high"></span> High: {completedHigh}</div>
          <div className="legend-item"><span className="dot medium"></span> Medium: {completedMedium}</div>
          <div className="legend-item"><span className="dot low"></span> Low: {completedLow}</div>
        </div>
      )}
    </Card>
  );
}