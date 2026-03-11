import { useFormStatus } from 'react-dom';

export default function Button({ 
  children, 
  type = 'button', 
  className = '', 
  variant = 'primary', // primary, submit-task, outline
  onClick,
  ...props 
}) {
  // Хук работает только если кнопка внутри <form>
  const { pending } = useFormStatus();
  
  // Если это кнопка отправки формы, следим за pending
  const isLoading = type === 'submit' ? pending : false;

  // Базовые классы + кастомные + вариант
  const baseClass = variant === 'primary' ? 'auth-button' : 
                    variant === 'submit-task' ? 'task-submit-btn' : '';

  return (
    <button 
      type={type} 
      className={`${baseClass} ${className}`.trim()} 
      disabled={isLoading || props.disabled}
      onClick={onClick}
      {...props}
    >
      {isLoading ? '...' : children}
    </button>
  );
}