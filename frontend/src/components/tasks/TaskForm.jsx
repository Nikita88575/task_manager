import { useActionState, useRef, useState } from 'react';
import Button from '../ui/Button';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale/ru';

// Регистрируем русскую локаль (чтобы были понедельники, а не Monday, и 24 часа)
registerLocale('ru', ru);

export default function TaskForm({ onAddTask }) {
  const formRef = useRef(null);
  
  // Создаем стейт для хранения выбранной даты
  const [selectedDate, setSelectedDate] = useState(null);

  const [state, formAction] = useActionState(async (prevState, formData) => {
    const title = formData.get('title');
    const priority = formData.get('priority');
    
    // Берем дату не из formData, а из нашего стейта, и переводим в формат ISO для Django
    const due_date = selectedDate ? selectedDate.toISOString() : null;

    if (!title.trim()) return { error: 'Задача не может быть пустой' };

    try {
      await onAddTask({ title, priority, due_date });
      formRef.current?.reset();
      setSelectedDate(null); // Очищаем календарь после успешного добавления
      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: 'Не удалось добавить задачу' };
    }
  }, null);

  return (
    <div className="task-form-container">
      {state?.error && <div className="error-message">{state.error}</div>}
      
      <form action={formAction} ref={formRef} className="task-form-inline">
        <input 
          type="text" 
          name="title" 
          placeholder="Что нужно сделать?" 
          required 
          className="task-input-main"
        />
        
        {/* НАШ НОВЫЙ ИДЕАЛЬНЫЙ КАЛЕНДАРЬ */}
        <div className="date-picker-wrapper">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"       // 24-часовой формат времени в выпадающем списке
            timeIntervals={15}       // Шаг времени (15 минут)
            timeCaption="Время"
            dateFormat="dd.MM.yyyy HH:mm" // ТОТ САМЫЙ европейский формат
            locale="ua"             
            placeholderText="Дедлайн"
            className="task-date-input"
            isClearable              // Появляется крестик, чтобы очистить дату
          />
        </div>

        <select name="priority" className="priority-select" defaultValue="MEDIUM">
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <Button type="submit" className="task-submit-btn">+</Button>
      </form>
    </div>
  );
}