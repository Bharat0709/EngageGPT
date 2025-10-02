
// EmailMediaPreview.jsx
import React from 'react';
import { Button } from 'antd';
import { Icons } from '@utils/constantData/icons';

const EmailMediaPreview = ({ attachments, setEmailData }) => {
  const handleDeleteFile = (fileName) => {
    setEmailData((prevData) => ({
      ...prevData,
      attachments: prevData.attachments.filter((file) => file.name !== fileName),
    }));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <Icons.Image className="h-6 w-6 text-blue-500" />;
    } else if (fileType === 'application/pdf') {
      return <Icons.Document className="h-6 w-6 text-red-500" />;
    } else if (fileType.startsWith('video/')) {
      return <Icons.Video className="h-6 w-6 text-purple-500" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <Icons.Document className="h-6 w-6 text-blue-600" />;
    } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return <Icons.Document className="h-6 w-6 text-green-600" />;
    } else if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
      return <Icons.Document className="h-6 w-6 text-orange-600" />;
    } else if (fileType.startsWith('text/')) {
      return <Icons.Document className="h-6 w-6 text-gray-500" />;
    } else {
      return <Icons.Files className="h-6 w-6 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const truncateFileName = (fileName, maxLength = 25) => {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension.length - 4) + '...';
    return truncatedName + '.' + extension;
  };

  return (
    <div className="space-y-3 mt-4">
      {attachments.map((file) => (
        <div
          key={file.name}
          className="p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {file.type.startsWith('image/') && file.preview ? (
                <img
                  className="rounded-md object-cover"
                  src={file.preview}
                  alt={file.name}
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                  {getFileIcon(file.type)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {truncateFileName(file.name)}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span>{formatFileSize(file.size)}</span>
                <span>•</span>
                <span className="capitalize">
                  {file.type.split('/')[1] || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
          <Button
            type="text"
            danger
            size="small"
            icon={<Icons.Trash className="h-4 w-4" />}
            onClick={() => handleDeleteFile(file.name)}
            className="flex-shrink-0 ml-2"
          />
        </div>
      ))}
    </div>
  );
};

export default EmailMediaPreview;