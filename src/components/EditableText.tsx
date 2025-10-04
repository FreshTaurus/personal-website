import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  tag?: keyof React.JSX.IntrinsicElements;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit...',
  multiline = false,
  tag = 'span'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onChange(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && e.metaKey && multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const Tag = tag as any;

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <div className="relative group">
        <InputComponent
          ref={inputRef as any}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`${className} border-2 border-primary-500 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          placeholder={placeholder}
          rows={multiline ? 3 : 1}
        />
        <div className="absolute -right-8 top-0 flex space-x-1">
          <button
            onClick={handleSave}
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            title="Save"
          >
            <Save className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Cancel"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Tag
        className={`${className} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-1 py-0.5 transition-colors`}
        onClick={() => setIsEditing(true)}
      >
        {value || placeholder}
      </Tag>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 p-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-all"
        title="Edit"
      >
        <Edit2 className="w-3 h-3" />
      </button>
    </div>
  );
};

export default EditableText;
