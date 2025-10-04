import React from 'react';
import { Edit3, Save, Lock, Unlock } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

const EditModeToggle: React.FC = () => {
  const { isEditMode, isAuthenticated, toggleEditMode, saveData } = useCMS();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col space-y-2">
        {/* Save Button - only show when in edit mode */}
        {isEditMode && (
          <button
            onClick={saveData}
            className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105"
            title="Save Changes"
          >
            <Save className="w-5 h-5" />
          </button>
        )}
        
        {/* Edit Mode Toggle */}
        <button
          onClick={toggleEditMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 ${
            isEditMode
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : isAuthenticated
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          }`}
          title={isEditMode ? 'Exit Edit Mode' : isAuthenticated ? 'Enter Edit Mode' : 'Login to Edit'}
        >
          {isEditMode ? (
            <Lock className="w-5 h-5" />
          ) : isAuthenticated ? (
            <Edit3 className="w-5 h-5" />
          ) : (
            <Unlock className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute -top-12 right-0 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
          ✏️ Edit Mode Active
        </div>
      )}
    </div>
  );
};

export default EditModeToggle;
