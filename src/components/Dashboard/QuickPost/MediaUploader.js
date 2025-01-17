import React, { useState } from 'react';
import MediaPreview from './MediaPreview';
import { FaImage } from 'react-icons/fa';

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

  // const handlePdfUpload = () => {
  //   setIsImageUpload(false);
  //   // Clear images if switching to PDF upload
  //   setPostDetails((prevDetails) => ({
  //     ...prevDetails,
  //     media: prevDetails.media.filter(
  //       (file) => file.type === 'application/pdf',
  //     ),
  //   }));
  // };

  return (
    <div className="p-4 border mt-3 bg-white border-gray-300 rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Upload Media
        </h4>
        <div className="flex gap-4 mb-4">
          <button
            className={`py-4 px-4 rounded-md flex items-center justify-center ${
              isImageUpload
                ? 'bg-gray-100'
                : 'bg-white text-gray-700 hover:bg-gray-300'
            }`}
            onClick={handleImageUpload}
            disabled={isImageUpload}
          >
            <FaImage size={20} />
          </button>
          {/* <button
            className={`py-4 px-4 rounded-md flex items-center justify-center ${
              !isImageUpload
                ? 'bg-gray-100'
                : 'bg-white text-gray-700 hover:bg-gray-300'
            }`}
            onClick={handlePdfUpload}
            disabled={!isImageUpload}
          >
            <FaFilePdf size={20} />
          </button> */}
        </div>
      </div>

      <div className="relative mt-1 flex-col border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-100">
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

      <MediaPreview media={postDetails.media} setPostDetails={setPostDetails} />
    </div>
  );
};

export default MediaUploader;
