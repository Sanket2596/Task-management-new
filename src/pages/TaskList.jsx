import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import TagManager from '../components/TagManager';

const TaskList = () => {
  const { getToken } = useUser();
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState('all');
  const [groupBy, setGroupBy] = useState('dueDate');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = await getToken();
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleTagsUpdated = (updatedTags) => {
    setTags(updatedTags);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return task.tags.some((tag) => tag._id === filter);
  });

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const key = groupBy === 'dueDate'
      ? task.dueDate ? new Date(task.dueDate).toDateString() : 'No Due Date'
      : task.tags.map((tag) => tag.name).join(', ') || 'No Tags';
    
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(task);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      <TagManager onTagsUpdated={handleTagsUpdated} />
      <TaskForm onTaskAdded={handleTaskAdded} tags={tags} />
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="filter" className="mr-2">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>{tag.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="groupBy" className="mr-2">Group by:</label>
          <select
            id="groupBy"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="dueDate">Due Date</option>
            <option value="tags">Tags</option>
          </select>
        </div>
      </div>
      {Object.entries(groupedTasks).map(([group, groupTasks]) => (
        <div key={group} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{group}</h2>
          {groupTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;