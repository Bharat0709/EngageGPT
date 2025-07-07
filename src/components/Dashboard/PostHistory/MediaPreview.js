import React, { useState } from 'react';
import {
  FiX,
  FiImage,
  FiVideo,
  FiFileText,
  FiZoomIn,
  FiZoomOut,
} from 'react-icons/fi';

const MediaPreviewModal = ({ isOpen, onClose, media }) => {
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState(false);

  if (!media || !isOpen) return null;

  const isImage =
    media.type?.toLowerCase() === 'image' ||
    media.url?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i);
  const isVideo =
    media.type?.toLowerCase() === 'video' ||
    media.url?.match(/\.(mp4|mov|avi|wmv|flv|webm)$/i);

  const getFileIcon = () => {
    if (isImage) return <FiImage className="w-16 h-16 text-blue-500" />;
    if (isVideo) return <FiVideo className="w-16 h-16 text-purple-500" />;
    return <FiFileText className="w-16 h-16 text-gray-500" />;
  };

  const getFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-11/12 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {isImage && <FiImage className="w-5 h-5 text-blue-500" />}
                {isVideo && <FiVideo className="w-5 h-5 text-purple-500" />}
                {!isImage && !isVideo && (
                  <FiFileText className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {media.name || 'Media File'}
                </h3>
                <p className="text-sm text-gray-500">
                  {media.type || 'Unknown'}
                  {media.size && ` • ${getFileSize(media.size)}`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Content */}
        <div
          className="relative bg-gray-50 flex items-center justify-center"
          style={{ height: '60vh' }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center space-y-4 p-8">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <FiFileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Failed to load media</p>
            </div>
          )}

          {media.url && !error && (
            <>
              {isImage && (
                <img
                  src={media.url}
                  alt={media.name || 'Media'}
                  className="max-w-full max-h-full object-contain transition-transform duration-300"
                  style={{ transform: `scale(${zoom})` }}
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setError(true);
                  }}
                />
              )}

              {isVideo && (
                <video
                  src={media.url}
                  controls
                  className="max-w-full max-h-full object-contain"
                  style={{ transform: `scale(${zoom})` }}
                  onLoadedData={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setError(true);
                  }}
                />
              )}

              {!isImage && !isVideo && (
                <div className="flex flex-col items-center justify-center space-y-4 p-8">
                  {getFileIcon()}
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-900">
                      {media.name || 'Media File'}
                    </p>
                    <p className="text-gray-500">
                      {media.type || 'Unknown file type'}
                    </p>
                    {media.size && (
                      <p className="text-sm text-gray-400 mt-1">
                        {getFileSize(media.size)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {!media.url && !loading && (
            <div className="flex flex-col items-center justify-center space-y-4 p-8">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <FiFileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Media not available</p>
            </div>
          )}

          {/* Zoom Controls - Only show for images */}
          {isImage && !loading && !error && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-md transition-all"
                disabled={zoom <= 0.5}
              >
                <FiZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                className="px-3 py-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-md transition-all text-sm font-medium"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-md transition-all"
                disabled={zoom >= 3}
              >
                <FiZoomIn className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MediaPreviewModal;
