import { Icons } from '@utils/constantData/icons';

const PostContent = ({ postData }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Icons.User className="h-4 w-4 text-gray-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{postData.author}</p>
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
  );
};
export default PostContent;
