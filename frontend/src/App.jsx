import { useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import TaskDashboard from './components/tasks/TaskDashboard';
import './styles/index.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('access'));
  
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <TaskDashboard onLogout={() => {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          setIsAuthenticated(false);
        }} />
      ) : isRegister ? (
        <RegisterForm onSwitchToLogin={() => setIsRegister(false)} />
      ) : (
        <LoginForm 
          onLogin={() => setIsAuthenticated(true)} 
          onSwitchToRegister={() => setIsRegister(true)} 
        />
      )}
    </div>
  );
}
