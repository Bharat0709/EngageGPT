import React, { useState } from 'react';
import MediaPreview from './MediaPreview';
import { Icons } from '@utils/constantData/icons';

const MediaUploader = ({ postDetails, setPostDetails }) => {
  const [isImageUpload, setIsImageUpload] = useState(true);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const filteredMedia = files.map((file) => ({
      type: file.type,
      size: file.size,
      name: file.name,
      file,
      url: URL.createObjectURL(file),
    }));

    // Update media based on the selected type (images or PDF)
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      media: isImageUpload ? filteredMedia : [filteredMedia[0]], // Multiple images or single PDF
    }));
  };

  const handleImageUpload = () => {
    setIsImageUpload(true);
    // Clear PDFs if switching to image upload
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      media: prevDetails.media.filter((file) => file.type.startsWith('image/')),
    }));
  };

  return (
    <div className="p-2 mb-2  mt-3 rounded-2xl bg-white ">
      <div className="flex px-2 items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Upload Media
        </h4>
        <div className="flex gap-4 mb-4">
          <button
            className={`py-2 px-2 rounded-md flex items-center justify-center ${
              isImageUpload
                ? 'bg-gray-100'
                : 'bg-white text-gray-700 hover:bg-gray-300'
            }`}
            onClick={handleImageUpload}
            disabled={isImageUpload}
          >
            <Icons.Image size={20} />
          </button>
        </div>
      </div>

      <div className="relative flex-col border-dashed border-2 border-gray-300 rounded-xl p-4 flex items-center justify-center cursor-pointer hover:bg-gray-100">
        <span className="text-gray-600 text-center">
          {isImageUpload ? 'Click to upload images' : 'Click to upload a PDF'}
        </span>
        <input
          type="file"
          accept={isImageUpload ? 'image/*' : 'application/pdf'}
          multiple={isImageUpload}
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {postDetails.media.length > 0 && (
        <MediaPreview
          media={postDetails.media}
          setPostDetails={setPostDetails}
        />
      )}
    </div>
  );
};

export default MediaUploader;
