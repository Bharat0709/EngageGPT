import Button from '@components/Common/Button';

const EditPostFooter = ({ onClose, handleSave, loading, post }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
      <div className="text-sm text-gray-600">
        Last updated:{' '}
        {post?.updatedAt
          ? moment(post.updatedAt).format('MMM DD, YYYY HH:mm')
          : 'Never'}
      </div>
      <div className="flex gap-3">
        <Button
          theme="light"
          onClick={onClose}
          className="!rounded-full border-none "
          buttonText="Cancel"
        />
        <Button
          theme="dark"
          isLoading={loading}
          onClick={handleSave}
          disabled={loading}
          className="!rounded-full"
          loadingText="Saving Changes..."
          buttonText="Save All Changes"
        />
      </div>
    </div>
  );
};

export default EditPostFooter;
