import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Plus, X } from 'lucide-react';

const TagManager = ({ onTagsUpdated }) => {
  const { getToken } = useUser();
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState({ name: '', color: 'blue' });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const token = await getToken();
      const response = await axios.get('http://localhost:5000/api/tags', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTags(response.data);
      onTagsUpdated(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const response = await axios.post('http://localhost:5000/api/tags', newTag, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTags([...tags, response.data]);
      onTagsUpdated([...tags, response.data]);
      setNewTag({ name: '', color: 'blue' });
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      const token = await getToken();
      await axios.delete(`http://localhost:5000/api/tags/${tagId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedTags = tags.filter((tag) => tag._id !== tagId);
      setTags(updatedTags);
      onTagsUpdated(updatedTags);
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tags</h2>
      <form onSubmit={handleAddTag} className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTag.name}
            onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
            placeholder="Tag name"
            className="flex-grow px-3 py-2 border rounded-lg"
            maxLength="20"
            required
          />
          <select
            value={newTag.color}
            onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            <Plus size={20} />
          </button>
        </div>
      </form>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag._id}
            className={`inline-flex items-center bg-${tag.color}-200 text-${tag.color}-800 px-2 py-1 rounded-full text-sm mr-2 mb-2`}
          >
            {tag.name}
            <button
              onClick={() => handleDeleteTag(tag._id)}
              className={`ml-1 text-${tag.color}-600 hover:text-${tag.color}-800`}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagManager;