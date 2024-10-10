import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const TaskForm = ({ onTaskAdded }) => {
  const { getToken } = useUser();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    reminderFrequency: 'once',
    customReminderInterval: '',
    tags: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const response = await axios.post('http://localhost:5000/api/tasks', task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskAdded(response.data);
      setTask({
        title: '',
        description: '',
        dueDate: '',
        reminderFrequency: 'once',
        customReminderInterval: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date</label>
        <input
          type="datetime-local"
          id="dueDate"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reminderFrequency" className="block text-gray-700 font-bold mb-2">Reminder Frequency</label>
        <select
          id="reminderFrequency"
          value={task.reminderFrequency}
          onChange={(e) => setTask({ ...task, reminderFrequency: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      {task.reminderFrequency === 'custom' && (
        <div className="mb-4">
          <label htmlFor="customReminderInterval" className="block text-gray-700 font-bold mb-2">Custom Reminder Interval (in minutes)</label>
          <input
            type="number"
            id="customReminderInterval"
            value={task.customReminderInterval}
            onChange={(e) => setTask({ ...task, customReminderInterval: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            min="1"
          />
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;