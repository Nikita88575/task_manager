import { useActionState } from 'react';
import api from '../../api';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function LoginForm({ onLogin, onSwitchToRegister }) {
  const [state, formAction] = useActionState(async (prevState, formData) => {
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await api.post('auth/jwt/create/', { username, password });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      onLogin(); 
      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: 'Invalid username or password' };
    }
  }, null);

  return (
    <Card className="auth-card">
      <h2>Log in</h2>
      
      <form action={formAction} className="auth-form">
        {state?.error && <div className="error-message">{state.error}</div>}

        <div className="input-group">
          <input type="text" name="username" placeholder="Username" required />
        </div>

        <div className="input-group">
          <input type="password" name="password" placeholder="Password" required />
        </div>

        {/* Наша новая умная кнопка */}
        <Button type="submit" variant="primary">Log in</Button>
      </form>

     <p className="auth-footer">
      Don't have an account?{' '}
      <span onClick={onSwitchToRegister} className="link">Sign up</span>
     </p>
    </Card>
  );
}