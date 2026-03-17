import { useActionState } from 'react';
import api from '../../api';
import Button from '../ui/Button';
import Card from '../ui/Card';

async function registerAction(prevState, formData) {
  const username = formData.get('username');
  const password = formData.get('password');
  const re_password = formData.get('re_password');

  if (password !== re_password) {
    return { error: 'Passwords do not match' };
  }

  try {
    await api.post('auth/users/', { username, password });
    return { success: true };
  } catch (error) {
    const errorData = error.response?.data;
    const errorMsg = errorData?.username?.[0] || errorData?.password?.[0] || 'Error during registration';
    return { error: errorMsg };
  }
}

export default function RegisterForm({ onSwitchToLogin }) {
  const [state, action] = useActionState(registerAction, null);

  if (state?.success) {
    return (
      <Card className="auth-card">
        <h2>Registration successful!</h2>
        <p>You can now log in to your account.</p>
        <button onClick={onSwitchToLogin} className="switch-button link">
          Go to login
        </button>
      </Card>
    );
  }

  return (
    <Card className="auth-card">
      <h2>Create Account</h2>
      
      <form action={action} className="auth-form">
        {state?.error && <div className="error-message">{state.error}</div>}

        <div className="input-group">
          <input type="text" name="username" placeholder="Username" required />
        </div>

        <div className="input-group">
          <input type="password" name="password" placeholder="Password" required minLength="8" />
        </div>

        <div className="input-group">
          <input type="password" name="re_password" placeholder="Confirm Password" required minLength="8" />
        </div>

        <Button type="submit" variant="primary">Sign up</Button>
      </form>

      <p className="auth-footer">
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} className="link">Log in</span>
      </p>
    </Card>
  );
}