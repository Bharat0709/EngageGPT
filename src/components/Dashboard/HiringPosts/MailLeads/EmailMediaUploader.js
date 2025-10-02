
import React, { useRef } from 'react';
import { Button } from 'antd';
import { Icons } from '@utils/constantData/icons';
import EmailMediaPreview from './EmailMediaPreview';

const EmailMediaUploader = ({ emailData, setEmailData }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    const processedFiles = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      file: file, // Keep the original file object for sending
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      lastModified: file.lastModified,
    }));

    // Add new files to existing attachments
    setEmailData((prevData) => ({
      ...prevData,
      attachments: [...prevData.attachments, ...processedFiles],
    }));

    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    
    const processedFiles = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      lastModified: file.lastModified,
    }));

    setEmailData((prevData) => ({
      ...prevData,
      attachments: [...prevData.attachments, ...processedFiles],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Attachments
          {emailData.attachments.length > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              ({emailData.attachments.length} file{emailData.attachments.length !== 1 ? 's' : ''})
            </span>
          )}
        </label>
        <Button
          type="default"
          size="small"
          icon={<Icons.Files className="h-4 w-4" />}
          onClick={triggerFileSelect}
          className="flex items-center gap-2"
        >
          Add Files
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="*/*"
      />

      {/* Drag and drop area - only show if no files are attached */}
      {emailData.attachments.length === 0 && (
        <div
          className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={triggerFileSelect}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            <Icons.Files className="h-8 w-8 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <div className="text-xs text-gray-500">
              Any file type is supported
            </div>
          </div>
        </div>
      )}

      {/* File preview */}
      {emailData.attachments.length > 0 && (
        <EmailMediaPreview
          attachments={emailData.attachments}
          setEmailData={setEmailData}
        />
      )}
    </div>
  );
};

export default EmailMediaUploader;
