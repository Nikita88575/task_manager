import { useState, useEffect } from 'react';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm'; // 1. ДОБАВИЛИ ИМПОРТ!
import TaskDashboard from './components/tasks/TaskDashboard';
import './styles/index.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Сначала проверяем токен (выполняется один раз при загрузке)
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // 3. Пока идет проверка токена — показываем загрузку
  if (isLoading) {
    return <div className="loader">Загрузка...</div>;
  }

  // 4. Единый контейнер для всего приложения
  return (
    <div className="app-container">
      {isAuthenticated ? (
        // Если залогинен — дашборд
        <TaskDashboard onLogout={() => {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          setIsAuthenticated(false);
        }} />
      ) : isRegister ? (
        // Если не залогинен и нажал "Регистрация"
        <RegisterForm onSwitchToLogin={() => setIsRegister(false)} />
      ) : (
        // По умолчанию — логин
        <LoginForm 
          onLogin={() => setIsAuthenticated(true)} 
          onSwitchToRegister={() => setIsRegister(true)} 
        />
      )}
    </div>
  );
}