import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const MediaPreview = ({ media, removeMedia }) => {
  return (
    <div className="flex flex-col mt-4 gap-3">
      {media.map((file, index) => {
        let isExistingMedia = false;
        if (file.url && typeof file.url !== 'string') {
          isExistingMedia = file.url.url !== undefined;
        }
        const imageUrl = file.url?.url || file.url; //  Handle nested URLs
        return (
          <div key={index} className="p-2 pr-4 border rounded-lg flex justify-between gap-3 items-center">
            <div className="flex gap-2 items-center">
              <img className="rounded-lg" src={imageUrl} alt={file.name || 'Media'} style={{ width: 50, height: 50 }} />
              <span className="text-sm">{file.name || 'Media'}</span>
            </div>
            <Button 
              icon={<DeleteOutlined />} 
              onClick={() => removeMedia(index,  isExistingMedia)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MediaPreview;