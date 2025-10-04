import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from '../components/EditableText';
// import ImageUpload from '../components/ImageUpload';

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { data, isEditMode, updateGalleryItem, addGalleryItem, deleteGalleryItem } = useCMS();
  const photos = data.gallery;

  const categories = ['All', 'Work', 'Teamwork', 'Events', 'Learning', 'Personal'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter((photo: Photo) => photo.category === activeCategory);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const currentIndex = filteredPhotos.findIndex((photo: Photo) => photo.id === selectedPhoto?.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
    setSelectedIndex(newIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePhoto('prev');
    if (e.key === 'ArrowRight') navigatePhoto('next');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A glimpse into my journey as a Computer Science student, 
            showcasing moments of learning, collaboration, and personal growth.
          </p>
          {isEditMode && (
            <div className="mt-6">
              <button
                onClick={() => addGalleryItem({
                  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                  alt: 'New photo',
                  caption: 'Add your caption here...',
                  category: 'Personal'
                })}
                className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 mx-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Photo
              </button>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo: Photo, index: number) => (
            <div
              key={photo.id}
              className="group cursor-pointer relative"
              onClick={() => !isEditMode && openLightbox(photo, index)}
            >
              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteGalleryItem(photo.id);
                  }}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Delete photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white dark:bg-gray-800 rounded-full p-3">
                      <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  {isEditMode ? (
                    <div className="space-y-2">
                      <EditableText
                        value={photo.caption}
                        onChange={(value) => updateGalleryItem(photo.id, { caption: value })}
                        className="text-white text-sm font-medium"
                        tag="span"
                        multiline
                      />
                      <EditableText
                        value={photo.category}
                        onChange={(value) => updateGalleryItem(photo.id, { category: value })}
                        className="text-primary-300 text-xs"
                        tag="span"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-white text-sm font-medium">{photo.caption}</p>
                      <span className="text-primary-300 text-xs">{photo.category}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigatePhoto('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigatePhoto('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Photo */}
              {selectedPhoto && (
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}

              {/* Caption */}
              {selectedPhoto && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-lg font-medium mb-2">{selectedPhoto.caption}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-300 text-sm">{selectedPhoto.category}</span>
                    <span className="text-gray-300 text-sm">
                      {selectedIndex + 1} of {filteredPhotos.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No photos found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No photos match the selected category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;