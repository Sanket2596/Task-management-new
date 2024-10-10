import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { CheckCircle, Edit, Trash } from 'lucide-react';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const { getToken } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleComplete = async () => {
    try {
      const token = await getToken();
      const response = await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskUpdated(response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = await getToken();
      const response = await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, editedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = await getToken();
        await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onTaskDeleted(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg mb-2"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg mb-2"
          rows="3"
        ></textarea>
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2">
          Save
        </button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white shadow rounded-lg p-4 mb-4 ${task.completed ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-xl font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
        <div className="flex space-x-2">
          <button onClick={handleComplete} className="text-green-500 hover:text-green-600">
            <CheckCircle size={20} />
          </button>
          <button onClick={handleEdit} className="text-blue-500 hover:text-blue-600">
            <Edit size={20} />
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
            <Trash size={20} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <div className="mt-2 flex flex-wrap">
        {task.tags.map((tag) => (
          <span
            key={tag._id}
            className={`inline-block bg-${tag.color}-200 text-${tag.color}-800 px-2 py-1 rounded-full text-sm mr-2 mb-2`}
          >
            {tag.name}
          </span>
        ))}
      </div>
      {task.dueDate && (
        <p className="text-sm text-gray-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default TaskItem;