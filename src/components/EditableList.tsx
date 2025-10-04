import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

interface EditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  className?: string;
}

const EditableList: React.FC<EditableListProps> = ({
  items,
  onChange,
  placeholder = 'Add new item...',
  className = ''
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleDelete = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(items[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editValue.trim()) {
      const newItems = [...items];
      newItems[editingIndex] = editValue.trim();
      onChange(newItems);
      setEditingIndex(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isAdding) {
        handleAdd();
      } else if (editingIndex !== null) {
        handleSaveEdit();
      }
    } else if (e.key === 'Escape') {
      if (isAdding) {
        setIsAdding(false);
        setNewItem('');
      } else if (editingIndex !== null) {
        handleCancelEdit();
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 group">
          {editingIndex === index ? (
            <div className="flex-1 flex items-center space-x-2">
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-2 py-1 border border-primary-500 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleSaveEdit}
                className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                title="Save"
              >
                <Save className="w-3 h-3" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                title="Cancel"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <>
              <span className="flex-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                {item}
              </span>
              <button
                onClick={() => handleEdit(index)}
                className="opacity-0 group-hover:opacity-100 p-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-all"
                title="Edit"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="opacity-0 group-hover:opacity-100 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                title="Delete"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      ))}
      
      {isAdding ? (
        <div className="flex items-center space-x-2">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 px-2 py-1 border border-primary-500 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            autoFocus
          />
          <button
            onClick={handleAdd}
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            title="Add"
          >
            <Save className="w-3 h-3" />
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewItem('');
            }}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Cancel"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      )}
    </div>
  );
};

export default EditableList;
