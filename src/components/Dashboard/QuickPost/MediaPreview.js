import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const MediaPreview = ({ media, setPostDetails }) => {
  const handleDeleteFile = (fileName) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      media: prevDetails.media.filter((file) => file.name !== fileName),
    }));
  };

  return (
    <div className="flex flex-col mt-4 gap-3 ">
      {media.map((file) => (
        <div
          key={file.name}
          className="p-2 pr-4 border rounded-lg justify-between flex gap-3 items-center"
        >
          <div className="flex gap-2 items-center">
            <img
              className="rounded-lg"
              src={file.url}
              alt={file.name}
              style={{ width: 50, height: 50 }}
            />
            <span className="text-sm">{file.name}</span>
          </div>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteFile(file.name)}
          ></Button>
        </div>
      ))}
    </div>
  );
};

export default MediaPreview;
