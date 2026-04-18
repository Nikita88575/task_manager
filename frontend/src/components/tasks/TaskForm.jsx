import { useActionState, useRef, useState } from 'react';
import Button from '../ui/Button';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale/ru';

registerLocale('ru', ru);

export default function TaskForm({ onAddTask }) {
  const formRef = useRef(null);
  
  const [selectedDate, setSelectedDate] = useState(null);

  const [state, formAction] = useActionState(async (prevState, formData) => {
    const title = formData.get('title');
    const priority = formData.get('priority');
    
    const due_date = selectedDate ? selectedDate.toISOString() : null;

    if (!title.trim()) return { error: 'Task cannot be empty' };

    try {
      await onAddTask({ title, priority, due_date });
      formRef.current?.reset();
      setSelectedDate(null); 
      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to add task' };
    }
  }, null);

  return (
    <div className="task-form-container">
      {state?.error && <div className="error-message">{state.error}</div>}
      
      <form action={formAction} ref={formRef} className="task-form-inline">
        <input 
          type="text" 
          name="title" 
          placeholder="What needs to be done ?" 
          required 
          className="task-input-main"
        />
        
        <div className="date-picker-wrapper">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"       
            timeIntervals={15}       
            timeCaption="Time"
            dateFormat="dd.MM.yyyy HH:mm" 
            locale="ua"             
            placeholderText="Deadline"
            className="task-date-input"
            isClearable             
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