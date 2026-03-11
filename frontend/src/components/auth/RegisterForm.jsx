import { useActionState } from 'react';
import api from '../../api';
import Button from '../ui/Button';
import Card from '../ui/Card';

async function registerAction(prevState, formData) {
  const username = formData.get('username');
  const password = formData.get('password');
  const re_password = formData.get('re_password');

  if (password !== re_password) {
    return { error: 'Пароли не совпадают' };
  }

  try {
    await api.post('auth/users/', { username, password });
    return { success: true };
  } catch (error) {
    const errorData = error.response?.data;
    const errorMsg = errorData?.username?.[0] || errorData?.password?.[0] || 'Ошибка при регистрации';
    return { error: errorMsg };
  }
}

export default function RegisterForm({ onSwitchToLogin }) {
  const [state, action] = useActionState(registerAction, null);

  if (state?.success) {
    return (
      <Card className="auth-card">
        <h2>Регистрация успешна!</h2>
        <p>Теперь вы можете войти в свой аккаунт.</p>
        <button onClick={onSwitchToLogin} className="switch-button link">
          Перейти ко входу
        </button>
      </Card>
    );
  }

  return (
    <Card className="auth-card">
      <h2>Создать аккаунт</h2>
      
      <form action={action} className="auth-form">
        {state?.error && <div className="error-message">{state.error}</div>}

        <div className="input-group">
          <input type="text" name="username" placeholder="Имя пользователя" required />
        </div>

        <div className="input-group">
          <input type="password" name="password" placeholder="Пароль" required minLength="8" />
        </div>

        <div className="input-group">
          <input type="password" name="re_password" placeholder="Повторите пароль" required minLength="8" />
        </div>

        <Button type="submit" variant="primary">Зарегистрироваться</Button>
      </form>

      <p className="auth-footer">
        Уже есть аккаунт?{' '}
        <span onClick={onSwitchToLogin} className="link">Войти</span>
      </p>
    </Card>
  );
}