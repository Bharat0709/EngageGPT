import Button from '@components/Common/Button';
import InfoModal from '@components/Common/InfoModal';
import { Icons } from '@utils/constantData/icons';
import { useState } from 'react';

const PostContent = ({ postData }) => {
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8  mt-2 rounded-full bg-gray-300 flex items-center justify-center">
              <Icons.User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
          <div className="flex-1  min-w-0">
            <div className='flex justify-between  mb-2 items-center'>
            <p className="text-sm  m-0 p-0 font-medium text-gray-900">
              {postData.author}
            </p>
            <div className="flex mt-2 items-center px-4 justify-between">
              <Button
                buttonText={'View Lead'}
                theme="dark"
                className="border-none"
                onClick={() => setInfoModalOpen(true)}
                icon={<Icons.Eye className="h-4 w-4" />}
              />
            </div>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {postData.content}
            </p>
            {postData.emailAddresses?.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <Icons.Mail className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {postData.emailAddresses.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {isInfoModalOpen && (
        <InfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setInfoModalOpen(false)}
          title={'Lead Post Content'}
          content={postData.content}
        />
      )}
    </>
  );
};
export default PostContent;
